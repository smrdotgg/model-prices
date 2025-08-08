"use client";
import { Badge } from "@/components/ui/badge";
import { List, X } from "lucide-react";
import { Route } from "..";
import { providerByPopularity } from "./popularity";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useNavigate } from "@tanstack/react-router";
import { useState } from "react";

export default function SideBar() {
	const data = Route.useLoaderData();
	const { tokenFilter, selectedModels } = Route.useSearch();
	const navigate = useNavigate({ from: Route.fullPath });
	const [expandedProviders, setExpandedProviders] = useState<Set<string>>(
		new Set(),
	);

	const handleTokenFilterChange = (filter: "both" | "input" | "output") => {
		navigate({
			search: (prev) => ({ ...prev, tokenFilter: filter }),
		});
	};

	const handleModelToggle = (providerId: string, modelId: string) => {
		const compositeId = `${providerId}:${modelId}`;
		navigate({
			search: (prev) => ({
				...prev,
				selectedModels: prev.selectedModels.includes(compositeId)
					? prev.selectedModels.filter((id) => id !== compositeId)
					: [...prev.selectedModels, compositeId],
			}),
		});
	};

	const handleProviderExpand = (providerId: string) => {
		setExpandedProviders((prev) => new Set([...prev, providerId]));
	};

	const handleProviderCollapse = (providerId: string) => {
		setExpandedProviders((prev) => {
			const newSet = new Set(prev);
			newSet.delete(providerId);
			return newSet;
		});
	};

	const handleModelDeselect = (compositeId: string) => {
		navigate({
			search: (prev) => ({
				...prev,
				selectedModels: prev.selectedModels.filter((id) => id !== compositeId),
			}),
		});
	};

	return (
		<div className="flex flex-col  w-80 max-w-80 h-full max-h-full  ">
			<ScrollArea className="h-full">
				<div className="flex flex-col gap-2">
					{/* Selected Models Section */}
					{selectedModels.length > 0 && (
						<div className="flex flex-col gap-2 border p-3 rounded">
							<p className="text-xs">Selected Models</p>
							<div className="flex gap-2 flex-wrap">
								{selectedModels.map((compositeId) => {
									const [providerId, modelId] = compositeId.split(":");
									const provider = data[providerId];
									const model = provider?.models[modelId];

									if (!model) return null;

									return (
										<Badge
											key={compositeId}
											variant="default"
											className="cursor-pointer flex items-center gap-1"
											onClick={() => handleModelDeselect(compositeId)}
										>
											{model.name}
											<X className="w-3 h-3" />
										</Badge>
									);
								})}
							</div>
						</div>
					)}

					<div className="flex flex-col gap-2 border p-3 rounded ">
						<p className="text-xs">Token Filter</p>
						<div className="flex gap-2">
							<Badge
								variant={tokenFilter === "both" ? "default" : "outline"}
								className="cursor-pointer"
								onClick={() => handleTokenFilterChange("both")}
							>
								Both
							</Badge>
							<Badge
								variant={tokenFilter === "input" ? "default" : "outline"}
								className="cursor-pointer"
								onClick={() => handleTokenFilterChange("input")}
							>
								Input
							</Badge>
							<Badge
								variant={tokenFilter === "output" ? "default" : "outline"}
								className="cursor-pointer"
								onClick={() => handleTokenFilterChange("output")}
							>
								Output
							</Badge>
						</div>
					</div>

					<div className="flex flex-col gap-2 border p-3 rounded ">
						<div className="flex justify-between *:my-auto">
							<p className="text-xs">Latest Models</p>
							{/* <Badge variant={"secondary"} className="cursor-pointer"> */}
							{/* 	<List className="w-4 h-4" /> */}
							{/* 	Full model list */}
							{/* </Badge> */}
						</div>
						{Object.entries(data)
							.sort((a, b) => {
								const aPopularity = providerByPopularity.includes(a[0])
									? 1 +
										providerByPopularity.length -
										providerByPopularity.indexOf(a[0])
									: 0;
								const bPopularity = providerByPopularity.includes(b[0])
									? 1 +
										providerByPopularity.length -
										providerByPopularity.indexOf(b[0])
									: 0;
								return bPopularity - aPopularity;
							})
							.map(([key, value]) => {
								const isExpanded = expandedProviders.has(key);
								const allModels = Object.values(value.models).sort(
									(a, b) =>
										new Date(b.release_date).getTime() -
										new Date(a.release_date).getTime(),
								);

								const displayModels = isExpanded
									? allModels
									: allModels.slice(0, 5);
								const remaining = allModels.length - displayModels.length;

								return (
									<div
										className="flex flex-col gap-2 border p-3 rounded "
										key={key}
									>
										<p className="text-xs">{value.name}</p>
										<div className="flex gap-2 flex-wrap">
											{displayModels.map((model) => {
												const compositeId = `${key}:${model.id}`;
												return (
													<Badge
														key={model.id}
														variant={
															selectedModels.includes(compositeId)
																? "default"
																: "outline"
														}
														className="cursor-pointer"
														onClick={() => handleModelToggle(key, model.id)}
													>
														{model.name}
													</Badge>
												);
											})}
											{!isExpanded && !!remaining && (
												<Badge
													variant={"secondary"}
													className="cursor-pointer"
													onClick={() => handleProviderExpand(key)}
												>
													+{remaining} {remaining == 1 ? "Model" : "Models"}
												</Badge>
											)}
											{isExpanded && (
												<Badge
													variant={"secondary"}
													className="cursor-pointer"
													onClick={() => handleProviderCollapse(key)}
												>
													Collapse
												</Badge>
											)}
										</div>
									</div>
								);
							})}
					</div>
				</div>
			</ScrollArea>
		</div>
	);
}
