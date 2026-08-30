import { translations } from "./i18n.js?v=21";
import { bodyInputs, chartEmpty, chartSummary, languageSelect, weightChart, weightChartArea, weightChartBaseline, weightChartGrid, weightChartLine, weightChartLineUnderlay, weightChartPoints, weightChartTooltip, weightChartTooltipBox, weightChartTooltipText, weightChartXLabels, weightChartYLabels, weightGoalLine, weightTrendLine } from "./elements.js?v=1";
import { getActiveProfile } from "./profiles.js?v=1";
import { formatMeasurementDate, formatWeight } from "./format.js?v=1";
import { state } from "./state.js?v=1";
import { logWeightTooltip } from "./debug.js?v=2";

export function getGoalWeight() {
  const savedGoal = getActiveProfile()?.goalWeight || "";
  return savedGoal === "" ? null : Number(savedGoal);
}
export function getWeightChartRange(values) {
  if (values.length === 0) return { minimum: 0, maximum: 1 };
  const sex = bodyInputs.sex.value || loadBodyStatsProfile()?.sex || "female";
  const referenceRange = sex === "male"
    ? { minimum: 65, maximum: 105 }
    : { minimum: 50, maximum: 90 };
  const actualMinimum = Math.min(...values);
  const actualMaximum = Math.max(...values);
  const goalWeight = getGoalWeight();
  const allValues = goalWeight === null
    ? [actualMinimum, actualMaximum]
    : [actualMinimum, actualMaximum, goalWeight];

  return {
    minimum: Math.min(referenceRange.minimum, Math.floor(Math.min(...allValues) - 5)),
    maximum: Math.max(referenceRange.maximum, Math.ceil(Math.max(...allValues) + 5)),
  };
}
export function loadBodyStatsProfile() {
  const savedStats = getActiveProfile()?.bodyStats || null;
  if (!savedStats) return null;

  try {
    return JSON.parse(savedStats);
  } catch (error) {
    return null;
  }
}

// Strip the hover/ping state from every chart point except `exceptPoint`. Used
// so only one diamond pings at a time: whichever point the user just hovered,
// tapped, or keyboard-focused wins, and the others drop their radar ring at
// once instead of lingering on their 2s auto-hide timer.
export function clearWeightPointHover(exceptPoint) {
  for (const child of weightChartPoints.children) {
    if (child === exceptPoint) continue;
    if (child.classList.contains("is-hovered")) {
      child.classList.remove("is-hovered");
    }
  }
}

export function showWeightTooltip(point, entry, chartWidth, chartHeight) {
  logWeightTooltip("show:start", {
    date: entry.date,
    weight: entry.weight,
    pointClass: point.className.baseVal,
    pointTitle: point.querySelector("title")?.textContent || null,
    pointAriaLabel: point.getAttribute("aria-label"),
  });
  // Exclusive radar ping: only the freshly hovered/tapped/focused diamond may
  // ping. If the previous point's 2s hide timer is still pending its
  // `is-hovered` class would overlap with this one - strip it from every other
  // point the instant a new point becomes active, before it pings.
  clearWeightPointHover(point);
  const tooltipText = `${formatMeasurementDate(entry.date)} · ${(translations[languageSelect.value] || translations.en).weightTooltip}: ${formatWeight(entry.weight)} kg`;
  if (state.weightTooltipHideDelayTimer) {
    clearTimeout(state.weightTooltipHideDelayTimer);
    state.weightTooltipHideDelayTimer = null;
  }
  // Unhide before measuring: opacity stays 0 until .is-visible, so nothing
  // flashes. Sizing from the real rendered text (getComputedTextLength)
  // beats per-character estimates, which undershot the mono font and let
  // text escape the chip.
  weightChartTooltip.hidden = false;
  weightChartTooltipText.textContent = tooltipText;
  const textWidth = weightChartTooltipText.getComputedTextLength();
  const tooltipWidth = Math.max(112, Math.ceil(textWidth) + 16);
  const tooltipHeight = 24;
  const pointX = Number(point.getAttribute("cx"));
  const pointY = Number(point.getAttribute("cy"));
  const tooltipX = Math.min(Math.max(pointX - tooltipWidth / 2, 4), chartWidth - tooltipWidth - 4);
  const tooltipY = pointY > 42 ? pointY - tooltipHeight - 10 : pointY + 12;

  weightChartTooltipBox.setAttribute("x", tooltipX);
  weightChartTooltipBox.setAttribute("y", tooltipY);
  weightChartTooltipBox.setAttribute("width", tooltipWidth);
  weightChartTooltipBox.setAttribute("height", tooltipHeight);
  weightChartTooltipText.setAttribute("x", tooltipX + tooltipWidth / 2);
  weightChartTooltipText.setAttribute("y", tooltipY + 16);
  weightChartTooltip.classList.add("is-visible");
  point.classList.add("is-hovered");

  if (state.weightTooltipTimer) clearTimeout(state.weightTooltipTimer);
  state.weightTooltipTimer = setTimeout(() => {
    logWeightTooltip("timer:expired", { date: entry.date });
    hideWeightTooltip(point);
  }, 2000);
  logWeightTooltip("show:timer-started", { timeoutMs: 2000 });
}

export function hideWeightTooltip(point) {
  logWeightTooltip("hide:start", {
    pointClass: point.className.baseVal,
  });
  if (state.weightTooltipTimer) {
    clearTimeout(state.weightTooltipTimer);
    state.weightTooltipTimer = null;
    logWeightTooltip("hide:timer-cleared");
  }
  if (state.weightTooltipFadeTimer) clearTimeout(state.weightTooltipFadeTimer);
  weightChartTooltip.classList.remove("is-visible");
  state.weightTooltipFadeTimer = setTimeout(() => {
    weightChartTooltip.hidden = true;
    state.weightTooltipFadeTimer = null;
  }, 180);
  point.classList.remove("is-hovered");
  logWeightTooltip("hide:complete");
}

export function scheduleHideWeightTooltip(point) {
  if (state.weightTooltipHideDelayTimer) clearTimeout(state.weightTooltipHideDelayTimer);
  logWeightTooltip("hide:scheduled", { delayMs: 2000 });
  state.weightTooltipHideDelayTimer = setTimeout(() => {
    state.weightTooltipHideDelayTimer = null;
    logWeightTooltip("hide:delay-expired");
    hideWeightTooltip(point);
  }, 2000);
}

export function renderWeightChart(entries) {
  const sortedEntries = [...entries].sort((a, b) => a.date.localeCompare(b.date));
  const hasChart = sortedEntries.length >= 2;
  const chartWidth = 600;
  const chartHeight = 240;
  const padding = { top: 20, right: 22, bottom: 28, left: 42 };
  const plotWidth = chartWidth - padding.left - padding.right;
  const plotHeight = chartHeight - padding.top - padding.bottom;
  const values = sortedEntries.map((entry) => Number(entry.weight));
  const chartRange = getWeightChartRange(values);
  const minimum = chartRange.minimum;
  const maximum = chartRange.maximum;
  const range = maximum - minimum;

  weightChart.hidden = !hasChart;
  chartEmpty.hidden = hasChart;
  if (hasChart) {
    const strings = translations[languageSelect.value] || translations.en;
    chartSummary.textContent = strings.chartSummary
      .replace("{count}", sortedEntries.length)
      .replace("{start}", formatMeasurementDate(sortedEntries[0].date))
      .replace("{end}", formatMeasurementDate(sortedEntries[sortedEntries.length - 1].date));
  } else {
    chartSummary.textContent = "";
  }
  weightChartLine.setAttribute(
    "points",
    sortedEntries.map((entry, index) => {
      const x = padding.left + (index / Math.max(sortedEntries.length - 1, 1)) * plotWidth;
      const y = padding.top + ((maximum - Number(entry.weight)) / range) * plotHeight;
      return `${x},${y}`;
    }).join(" ")
  );
  const trendPoints = sortedEntries.map((entry, index) => {
    const windowStart = Math.max(0, index - 2);
    const windowEntries = sortedEntries.slice(windowStart, index + 1);
    const average = windowEntries.reduce((sum, item) => sum + Number(item.weight), 0) / windowEntries.length;
    const x = padding.left + (index / Math.max(sortedEntries.length - 1, 1)) * plotWidth;
    const y = padding.top + ((maximum - average) / range) * plotHeight;
    return `${x},${y}`;
  });
  weightTrendLine.setAttribute("points", trendPoints.join(" "));
  const linePoints = sortedEntries.map((entry, index) => {
    const x = padding.left + (index / Math.max(sortedEntries.length - 1, 1)) * plotWidth;
    const y = padding.top + ((maximum - Number(entry.weight)) / range) * plotHeight;
    return `${x},${y}`;
  });
  weightChartArea.setAttribute(
    "points",
    `${linePoints.join(" ")} ${chartWidth - padding.right},${chartHeight - padding.bottom} ${padding.left},${chartHeight - padding.bottom}`
  );
  // Hard offset ink underlay: the chromatic-relief trick from the titles
  weightChartLineUnderlay.setAttribute("points", linePoints.join(" "));
  weightChartGrid.innerHTML = "";
  weightChartYLabels.innerHTML = "";
  weightChartPoints.innerHTML = "";
  weightChartXLabels.innerHTML = "";
  weightChartTooltip.hidden = true;
  logWeightTooltip("chart:render-reset");

  const goalWeight = getGoalWeight();
  if (goalWeight === null) {
    weightGoalLine.hidden = true;
  } else {
    const goalY = padding.top + ((maximum - goalWeight) / range) * plotHeight;
    weightGoalLine.hidden = false;
    weightGoalLine.setAttribute("x1", padding.left);
    weightGoalLine.setAttribute("x2", chartWidth - padding.right);
    weightGoalLine.setAttribute("y1", goalY);
    weightGoalLine.setAttribute("y2", goalY);
  }

  if (!hasChart) return;

  for (let index = 0; index < 4; index += 1) {
    const y = padding.top + (index / 3) * plotHeight;
    const line = document.createElementNS("http://www.w3.org/2000/svg", "line");
    line.setAttribute("x1", padding.left);
    line.setAttribute("x2", chartWidth - padding.right);
    line.setAttribute("y1", y);
    line.setAttribute("y2", y);
    line.setAttribute("stroke", "rgba(26, 26, 26, 0.14)");
    weightChartGrid.append(line);

    const label = document.createElementNS("http://www.w3.org/2000/svg", "text");
    const labelValue = maximum - (index / 3) * range;
    label.setAttribute("x", "4");
    label.setAttribute("y", y + 4);
    label.setAttribute("class", "chart-axis-label");
    label.textContent = `${Math.round(labelValue)} kg`;
    weightChartYLabels.append(label);
  }

  // Heavy ink baseline along the bottom of the plot (brutalist print rule)
  weightChartBaseline.setAttribute("x1", padding.left);
  weightChartBaseline.setAttribute("x2", chartWidth - padding.right);
  weightChartBaseline.setAttribute("y1", chartHeight - padding.bottom);
  weightChartBaseline.setAttribute("y2", chartHeight - padding.bottom);

  sortedEntries.forEach((entry, index) => {
    const x = padding.left + (index / Math.max(sortedEntries.length - 1, 1)) * plotWidth;
    const y = padding.top + ((maximum - Number(entry.weight)) / range) * plotHeight;
    const point = document.createElementNS("http://www.w3.org/2000/svg", "rect");
    // cx/cy ride along as data for the tooltip math; x/y place the diamond
    // (the 45deg rotation is applied in CSS so pop-in can scale around it)
    point.setAttribute("cx", x);
    point.setAttribute("cy", y);
    const pointSize = index === sortedEntries.length - 1 ? 13 : 11;
    point.setAttribute("x", x - pointSize / 2);
    point.setAttribute("y", y - pointSize / 2);
    point.setAttribute("width", pointSize);
    point.setAttribute("height", pointSize);
    point.setAttribute("fill", "var(--aberration-b)");
    point.setAttribute("stroke", "var(--ink)");
    point.setAttribute("stroke-width", "2.5");
    point.setAttribute("class", "chart-point chart-pop");
    point.style.setProperty("--pop-delay", `${index * 70}ms`);
    point.setAttribute("tabindex", "0");
    point.setAttribute("aria-label", `${formatMeasurementDate(entry.date)}: ${formatWeight(entry.weight)} kg`);
    const showPointTooltip = (eventName) => {
      logWeightTooltip(`event:${eventName}`, { date: entry.date });
      showWeightTooltip(point, entry, chartWidth, chartHeight);
    };
    const schedulePointTooltipHide = (eventName) => {
      logWeightTooltip(`event:${eventName}`, { date: entry.date });
      scheduleHideWeightTooltip(point);
    };
    point.addEventListener("pointerenter", () => showPointTooltip("pointerenter"));
    point.addEventListener("mouseenter", () => showPointTooltip("mouseenter"));
    point.addEventListener("pointerleave", () => schedulePointTooltipHide("pointerleave"));
    point.addEventListener("mouseleave", () => schedulePointTooltipHide("mouseleave"));
    point.addEventListener("focus", () => {
      logWeightTooltip("event:focus", { date: entry.date });
      showWeightTooltip(point, entry, chartWidth, chartHeight);
    });
    point.addEventListener("blur", () => {
      logWeightTooltip("event:blur", { date: entry.date });
      scheduleHideWeightTooltip(point);
    });
    weightChartPoints.append(point);
    // Radar ping ring for this point - revealed by the CSS sibling
    // selector while the diamond is hovered or keyboard-focused
    const ping = document.createElementNS("http://www.w3.org/2000/svg", "rect");
    ping.setAttribute("x", x - 10);
    ping.setAttribute("y", y - 10);
    ping.setAttribute("width", "20");
    ping.setAttribute("height", "20");
    ping.setAttribute("fill", "none");
    ping.setAttribute("stroke", "var(--aberration-b)");
    ping.setAttribute("stroke-width", "2");
    ping.setAttribute("class", "chart-ping");
    weightChartPoints.append(ping);

    const dateLabel = document.createElementNS("http://www.w3.org/2000/svg", "text");
    dateLabel.setAttribute("x", x);
    dateLabel.setAttribute("y", chartHeight - 6);
    dateLabel.setAttribute("class", "chart-axis-label chart-date-label");
    dateLabel.textContent = new Date(`${entry.date}T00:00:00`).toLocaleDateString(
      languageSelect.value,
      { month: "short", day: "numeric" }
    );
    weightChartXLabels.append(dateLabel);
  });

  replayWeightChartAnimation();
}

// Replay the chart's entrance (line draw + staggered point pops): fires on
// every re-render and whenever the Weight tab opens - otherwise the
// entrance plays invisibly at startup and the graph reads as static.
export function replayWeightChartAnimation() {
  if (weightChart.hidden) return;
  for (const line of [weightChartLine, weightChartLineUnderlay]) {
    line.classList.remove("chart-draw");
  }
  for (const point of weightChartPoints.children) {
    if (!point.classList.contains("chart-point")) continue;
    point.classList.remove("chart-pop");
  }
  void weightChart.getBoundingClientRect();
  for (const line of [weightChartLineUnderlay, weightChartLine]) {
    line.setAttribute("pathLength", "1");
    line.classList.add("chart-draw");
  }
  for (const point of weightChartPoints.children) {
    if (!point.classList.contains("chart-point")) continue;
    point.classList.add("chart-pop");
  }
}
// Weight-goal progress shared by the Weight tab and Dashboard heroes.
// "Current" is always the actual latest weight. "Start" is the recorded
// weight farthest from the goal (the real beginning of the effort, e.g. the
// 88 kg peak when cutting to 80), so matching the goal in the past can never
// make a current drift read as 100%.
export function computeWeightProgress(rawEntries, goalWeight) {
  const entries = [...rawEntries].sort((a, b) => a.date.localeCompare(b.date));
  const latest = entries[entries.length - 1];
  if (goalWeight === null || goalWeight === undefined || !latest) return null;
  const goal = Number(goalWeight);
  const current = Number(latest.weight);
  if (!Number.isFinite(goal) || !Number.isFinite(current)) return null;

  let startWeight = Number(entries[0].weight);
  let farthest = Math.abs(startWeight - goal);
  entries.forEach((entry) => {
    const distance = Math.abs(Number(entry.weight) - goal);
    if (distance > farthest) {
      farthest = distance;
      startWeight = Number(entry.weight);
    }
  });

  const totalDistance = Math.abs(startWeight - goal);
  if (totalDistance < 0.05) {
    // Every recorded weight sits on the goal line.
    return Math.abs(current - goal) < 0.05 ? 100 : 0;
  }
  const traveled = Math.abs(startWeight - current);
  return Math.min(100, Math.max(0, (traveled / totalDistance) * 100));
}
