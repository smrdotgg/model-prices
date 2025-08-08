"use client";
import { Badge } from "@/components/ui/badge";
import { List } from "lucide-react";
import { Route } from "..";
import { providerByPopularity } from "./popularity";
import { ScrollArea } from "@/components/ui/scroll-area";

export default function SideBar() {
	const data = Route.useLoaderData();
	return (
		<div className="flex flex-col  w-80 max-w-80 h-full max-h-full  ">
			<ScrollArea className="h-full">
				<div className="flex flex-col gap-2">
				<div className="flex flex-col gap-2 border p-3 rounded ">
					<p className="text-xs">Token Filter</p>
					<div className="flex gap-2">
						<Badge>Both</Badge>
						<Badge variant={"outline"}>Input</Badge>
						<Badge variant={"outline"}>Output</Badge>
					</div>
				</div>

				<div className="flex flex-col gap-2 border p-3 rounded ">
					<div className="flex justify-between *:my-auto">
						<p className="text-xs">Latest Models</p>
						<Badge variant={"secondary"} className="cursor-pointer">
							<List className="w-4 h-4" />
							Full model list
						</Badge>
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
							const mostRecentModels = Object.values(value.models)
								.sort(
									(a, b) =>
										new Date(b.release_date).getTime() -
										new Date(a.release_date).getTime(),
								)
								.slice(0, 5);
							const remaining =
								Object.keys(value.models).length - mostRecentModels.length;
							return (
								<div
									className="flex flex-col gap-2 border p-3 rounded "
									key={key}
								>
									<p className="text-xs">{value.name}</p>
									<div className="flex gap-2 flex-wrap">
										{mostRecentModels.map((model) => (
											<Badge key={model.id} variant={"outline"}>
												{model.name}
											</Badge>
										))}
										{!!remaining && (
											<Badge variant={"secondary"}>
												+{remaining} {remaining == 1 ? "Model" : "Models"}
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
