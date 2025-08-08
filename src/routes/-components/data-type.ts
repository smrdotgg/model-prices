export type ProvidersConfig = Record<
	string,
	{
		id: string;
		env: string[];
		npm: string;
		name: string;
		doc: string;
		api?: string;
		models: Record<
			string,
			{
				id: string;
				name: string;
				attachment: boolean;
				reasoning: boolean;
				temperature: boolean;
				tool_call: boolean;
				knowledge: string;
				release_date: string;
				last_updated: string;
				modalities: {
					input: string[];
					output: string[];
				};
				open_weights: boolean;
				cost: {
					input: number;
					output: number;
					cache_read?: number;
					cache_write?: number;
				};
				limit: {
					context: number;
					output: number;
				};
			}
		>;
	}
>;
