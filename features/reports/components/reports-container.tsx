"use client";

import { useState, useEffect, useMemo } from "react";
import { useStatsStore } from "@/features/reports/store/stats-store";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export function ReportsContainer() {
  const { getReportData } = useStatsStore();
  const [mounted, setMounted] = useState(false);
  const [dateRange, setDateRange] = useState<
    "today" | "week" | "month" | "custom"
  >("week");
  const [customFrom, setCustomFrom] = useState("");
  const [customTo, setCustomTo] = useState("");

  useEffect(() => {
    setMounted(true);
    const today = new Date();
    const fromDate = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000)
      .toISOString()
      .split("T")[0];
    const toDate = today.toISOString().split("T")[0];
    setCustomFrom(fromDate);
    setCustomTo(toDate);
  }, []);

  const getDateRange = () => {
    const today = new Date().toISOString().split("T")[0];

    switch (dateRange) {
      case "today":
        return { from: today, to: today };
      case "week":
        const weekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
          .toISOString()
          .split("T")[0];
        return { from: weekAgo, to: today };
      case "month":
        const monthAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)
          .toISOString()
          .split("T")[0];
        return { from: monthAgo, to: today };
      case "custom":
        return { from: customFrom, to: customTo };
      default:
        return { from: today, to: today };
    }
  };

  const data = getReportData(getDateRange());

  const summaryCards = useMemo(
    () => [
      {
        title: "Total Time",
        value: data.totalTime,
        unit: "hours",
        formatValue: (val: number) => val.toFixed(1),
        valueClassName: "text-foreground",
      },
      {
        title: "Billable Hours",
        value: data.billableTime,
        unit: "hours",
        formatValue: (val: number) => val.toFixed(1),
        valueClassName: "text-primary",
      },
      {
        title: "Earnings",
        value: data.earnings,
        unit: "revenue",
        formatValue: (val: number) => `$${val.toFixed(2)}`,
        valueClassName: "text-foreground",
      },
      {
        title: "Avg Per Day",
        value: data.averagePerDay,
        unit: "hours",
        formatValue: (val: number) => val.toFixed(1),
        valueClassName: "text-foreground",
      },
    ],
    [data.totalTime, data.billableTime, data.earnings, data.averagePerDay]
  );

  if (!mounted) return null;

  return (
    <>
      <h1 className="text-3xl font-bold text-foreground mb-8">
        Analytics & Reports
      </h1>

      {/* Date Range Selector */}
      <Card className="border-border bg-card mb-6">
        <CardContent className="pt-6">
          <div className="flex gap-4 flex-wrap items-end">
            <div className="flex gap-2">
              {["today", "week", "month", "custom"].map((range) => (
                <Button
                  key={range}
                  onClick={() => setDateRange(range as any)}
                  variant={dateRange === range ? "primary" : "outline"}
                  className="capitalize"
                >
                  {range}
                </Button>
              ))}
            </div>

            {dateRange === "custom" && (
              <div className="flex gap-4">
                <div>
                  <label className="text-sm text-muted-foreground block mb-2">
                    From
                  </label>
                  <Input
                    type="date"
                    value={customFrom}
                    onChange={(e) => setCustomFrom(e.target.value)}
                    className="border-border bg-background"
                  />
                </div>
                <div>
                  <label className="text-sm text-muted-foreground block mb-2">
                    To
                  </label>
                  <Input
                    type="date"
                    value={customTo}
                    onChange={(e) => setCustomTo(e.target.value)}
                    className="border-border bg-background"
                  />
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Summary Cards */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-6">
        {summaryCards.map((card, index) => (
          <Card key={index} className="border-border bg-card">
            <CardHeader>
              <CardTitle className="text-sm text-muted-foreground">
                {card.title}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className={`text-3xl font-bold ${card.valueClassName}`}>
                {card.formatValue(card.value)}
              </div>
              <p className="text-sm text-muted-foreground">{card.unit}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Charts */}
      <div className="grid gap-6 lg:grid-cols-2 mb-6">
        {/* Time by Project */}
        <Card className="border-border bg-card">
          <CardHeader>
            <CardTitle>Time by Project</CardTitle>
            <CardDescription>Distribution of tracked hours</CardDescription>
          </CardHeader>
          <CardContent>
            {data.timeByProject.length > 0 ? (
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={data.timeByProject}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={(entry) => `${entry.name}: ${entry.value}h`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {data.timeByProject.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            ) : (
              <div className="h-[300px] flex items-center justify-center text-muted-foreground">
                No data available
              </div>
            )}
          </CardContent>
        </Card>

        {/* Daily Trend */}
        <Card className="border-border bg-card">
          <CardHeader>
            <CardTitle>Daily Trend</CardTitle>
            <CardDescription>Hours tracked per day</CardDescription>
          </CardHeader>
          <CardContent>
            {data.dailyTrend.length > 0 ? (
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={data.dailyTrend}>
                  <CartesianGrid
                    strokeDasharray="3 3"
                    stroke="var(--color-border)"
                  />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "var(--color-card)",
                      border: `1px solid var(--color-border)`,
                    }}
                  />
                  <Line
                    type="monotone"
                    dataKey="hours"
                    stroke="var(--color-primary)"
                    strokeWidth={2}
                    dot={{ fill: "var(--color-primary)" }}
                  />
                </LineChart>
              </ResponsiveContainer>
            ) : (
              <div className="h-[300px] flex items-center justify-center text-muted-foreground">
                No data available
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Breakdown Table */}
      <Card className="border-border bg-card">
        <CardHeader>
          <CardTitle>Detailed Breakdown</CardTitle>
          <CardDescription>Hour distribution by project</CardDescription>
        </CardHeader>
        <CardContent>
          {data.timeByProject.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-3 px-4 font-semibold text-foreground">
                      Project
                    </th>
                    <th className="text-right py-3 px-4 font-semibold text-foreground">
                      Hours
                    </th>
                    <th className="text-right py-3 px-4 font-semibold text-foreground">
                      Percentage
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {data.timeByProject.map((project, idx) => {
                    const percentage =
                      data.totalTime > 0
                        ? ((project.value / data.totalTime) * 100).toFixed(1)
                        : "0";
                    return (
                      <tr
                        key={idx}
                        className="border-b border-border hover:bg-background/50"
                      >
                        <td className="py-3 px-4">
                          <div className="flex items-center gap-2">
                            <div
                              className="w-3 h-3 rounded-full"
                              style={{ backgroundColor: project.color }}
                            />
                            <span className="text-foreground">
                              {project.name}
                            </span>
                          </div>
                        </td>
                        <td className="text-right py-3 px-4 text-foreground font-mono">
                          {project.value.toFixed(1)}h
                        </td>
                        <td className="text-right py-3 px-4 text-muted-foreground">
                          {percentage}%
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="text-center text-muted-foreground py-8">
              No data available
            </p>
          )}
        </CardContent>
      </Card>
    </>
  );
}
