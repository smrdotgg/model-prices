"use client";
import { Badge } from "@/components/ui/badge";
import {
	BarChart,
	Bar,
	XAxis,
	YAxis,
	CartesianGrid,
	Tooltip,
	Legend,
	ResponsiveContainer,
} from "recharts";
import { ModeToggle } from "@/components/theme-toggle";
import * as v from "valibot";
import { List } from "lucide-react";
import Sidebar from "./-components/sidebar";
import { useState } from "react";

import { createFileRoute, useNavigate } from "@tanstack/react-router";
import logo from "../logo.svg";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/components/theme-provider";
import { useBarGraphColors } from "./-components/use-bargarph-colors";
import type { ProvidersConfig } from "./-components/data-type";

const LoginSchema = v.object({});
export const Route = createFileRoute("/")({
	component: Page,
	validateSearch: LoginSchema,
	loader: () => {
		return fetch(
			"https://square-bread-9f82.se-semere-tereffe.workers.dev/",
		).then((r) => {
			if (!r.ok) {
				throw new Error(r.statusText);
			} else {
				return r.json() as Promise<ProvidersConfig>;
			}
		});
	},
});

const CustomTooltip = ({ active, payload, label }: any) => {
	if (active && payload && payload.length) {
		return (
			<div className="p-2 rounded shadow-md bg-background border border-gray-700">
				<p className="font-medium">{label}</p>
				{payload.map((entry: any) => (
					<p key={entry.name} style={{ color: entry.color }}>
						{entry.name}: ${entry.value.toFixed(2)}
					</p>
				))}
			</div>
		);
	}
	return null;
};
export function Page() {
	const data = Route.useLoaderData();
	const [displayMode, setDisplayMode] = useState<string>("both");
	const { input: inputColor, output: outputColor } = useBarGraphColors();

	const searchParams = Route.useSearch();
	const navigate = useNavigate({ from: Route.fullPath });

	const chartData = [
		{ name: "gpt-4o", Input: 0.002, Output: 0.004 },
		{ name: "gpt-4o-mini", Input: 0.001, Output: 0.002 },
		{ name: "gpt-3.5-turbo", Input: 0.0005, Output: 0.0015 },
		{ name: "claude-3-opus", Input: 0.003, Output: 0.006 },
		{ name: "claude-3-sonnet", Input: 0.002, Output: 0.004 },
		{ name: "claude-3-haiku", Input: 0.001, Output: 0.002 },
		{ name: "mistral-large", Input: 0.0015, Output: 0.003 },
		{ name: "mistral-medium", Input: 0.001, Output: 0.002 },
		{ name: "mistral-small", Input: 0.0008, Output: 0.0016 },
		{ name: "gemini-pro", Input: 0.0025, Output: 0.005 },
	].map((e) => ({ ...e, Input: e.Input * 1000, Output: e.Output * 1000 }));

	return (
		<div className="bg-background max-h-[98vh] h-screen w-screen flex flex-col  p-3">
			<div className="flex justify-end">
				<ModeToggle />
			</div>
			<div className="flex flex-1 bg-0 h-full max-h-full ">
				<Sidebar />
				<ResponsiveContainer width="100%" height="100%" className={"min-h-80"}>
					<BarChart
						data={chartData}
						margin={{ top: 20, right: 30, left: 60, bottom: 120 }}
					>
						<CartesianGrid strokeDasharray="3 3" stroke="#374151" />
						<XAxis
							dataKey="name"
							angle={-45}
							textAnchor="end"
							height={100}
							interval={0}
							tick={{ fill: "#ffffff" }}
						/>
						<YAxis
							tickFormatter={(value) => `$${value.toFixed(2)}`}
							tick={{ fill: "#ffffff" }}
						/>
						<Tooltip content={<CustomTooltip />} />
						<Legend
							wrapperStyle={{
								paddingTop: "20px",
								color: "#ffffff",
							}}
						/>
						{(displayMode === "both" || displayMode === "input") && (
							<Bar dataKey="Input" fill={inputColor} name="Input Cost" />
						)}
						{(displayMode === "both" || displayMode === "output") && (
							<Bar dataKey="Output" fill={outputColor} name="Output Cost" />
						)}
					</BarChart>
				</ResponsiveContainer>
			</div>
		</div>
	);
}
