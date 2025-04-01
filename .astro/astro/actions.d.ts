declare module "astro:actions" {
	type Actions = typeof import("/Users/bird/workspace/bradleyb_dev/src/actions")["server"];

	export const actions: Actions;
}