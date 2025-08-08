"use client";
import { Badge } from "@/components/ui/badge";
import { List } from "lucide-react";

export default function SideBar() {
	return (
		<div className="flex flex-col  w-80 max-w-80 h-full">
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
					<p className="text-xs">Price Range</p>
					<div className="flex gap-2">
						<Badge>Both</Badge>
						<Badge variant={"outline"}>Low</Badge>
						<Badge variant={"outline"}>Mid</Badge>
						<Badge variant={"outline"}>High</Badge>
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
					<div className="flex flex-col gap-2 border p-3 rounded ">
						<p className="text-xs">Open AI</p>
						<div className="flex gap-2">
							<Badge>Both</Badge>
							<Badge variant={"outline"}>Low</Badge>
							<Badge variant={"outline"}>Mid</Badge>
							<Badge variant={"outline"}>High</Badge>
						</div>
					</div>
					<div className="flex flex-col gap-2 border p-3 rounded ">
						<p className="text-xs">Google</p>
						<div className="flex gap-2">
							<Badge>Both</Badge>
							<Badge variant={"outline"}>Low</Badge>
							<Badge variant={"outline"}>Mid</Badge>
							<Badge variant={"outline"}>High</Badge>
						</div>
					</div>
					<div className="flex flex-col gap-2 border p-3 rounded ">
						<p className="text-xs">Anthropic</p>
						<div className="flex gap-2">
							<Badge>Both</Badge>
							<Badge variant={"outline"}>Low</Badge>
							<Badge variant={"outline"}>Mid</Badge>
							<Badge variant={"outline"}>High</Badge>
						</div>
					</div>
					<div className="flex flex-col gap-2 border p-3 rounded ">
						<p className="text-xs">Open Source</p>
						<div className="flex gap-2">
							<Badge>Both</Badge>
							<Badge variant={"outline"}>Low</Badge>
							<Badge variant={"outline"}>Mid</Badge>
							<Badge variant={"outline"}>High</Badge>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
