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

const searchSchema = v.object({
	tokenFilter: v.optional(
		v.fallback(v.picklist(["both", "input", "output"]), "both"),
		"both",
	),
	selectedModels: v.optional(v.fallback(v.array(v.string()), []), []),
});

export const Route = createFileRoute("/")({
	component: Page,
	validateSearch: searchSchema,
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
	const { input: inputColor, output: outputColor } = useBarGraphColors();

	const { tokenFilter, selectedModels } = Route.useSearch();
	const navigate = useNavigate({ from: Route.fullPath });

	// Convert API data to chart format, treating each provider-model combination as separate
	const allModels = Object.entries(data).flatMap(([providerId, provider]) =>
		Object.values(provider.models).map((model) => ({
			name: `${model.name} (${provider.name})`,
			id: `${providerId}:${model.id}`, // Composite key: provider:model
			modelId: model.id,
			providerId: providerId,
			providerName: provider.name,
			Input: (model.cost?.input || 0) * 1000000, // Convert to per million tokens
			Output: (model.cost?.output || 0) * 1000000,
		})),
	);

	const chartData =
		selectedModels.length > 0
			? allModels.filter((model) => selectedModels.includes(model.id))
			: allModels.slice(0, 10); // Show top 10 if none selected

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
						{(tokenFilter === "both" || tokenFilter === "input") && (
							<Bar dataKey="Input" fill={inputColor} name="Input Cost" />
						)}
						{(tokenFilter === "both" || tokenFilter === "output") && (
							<Bar dataKey="Output" fill={outputColor} name="Output Cost" />
						)}
					</BarChart>
				</ResponsiveContainer>
			</div>
		</div>
	);
}
