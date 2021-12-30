/** @param {NS} ns */
export async function main(ns) {
    const target = ns.args[0];
    const threads = ns.args[1];
    const delay = ns.args[2];

    if (delay && delay > 0) {
        await ns.asleep(delay);
    }

    await ns.hack(target, { threads: threads });
}
