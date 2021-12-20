function allowance(ns, rate) {
	return ns.getPlayer().money * rate;
}

/** @param {NS} ns **/
export async function main(ns) {
	var rate = ns.args[0] ?? 0.05;
	ns.tprint(`Starting Hacknet with allowence rate: ${rate}`);
	if (ns.hacknet.numNodes() === 0) {
		ns.hacknet.purchaseNode();
	}

	while (true) {
		var nodes = ns.hacknet.numNodes();
		var maxAllowance = allowance(ns, rate);
		var newNodeCost = ns.hacknet.getPurchaseNodeCost();
		var topLevelUpgradeCost = 0;
		var topRamUpgradeCost = 0;
		var topCoreUpgradeCost = 0;
		var levelInt = 0;

		for (var i = 0; i < nodes; i++) {
			var level = ns.hacknet.getNodeStats(i).level;
			levelInt = (level < 10) ? 1 : (level < 20) ? 5 : 10;
			var levelCost = ns.hacknet.getLevelUpgradeCost(i, levelInt);
			var ramCost = ns.hacknet.getRamUpgradeCost(i, 1);
			var coreCost = ns.hacknet.getCoreUpgradeCost(i, 1);
			levelCost > topLevelUpgradeCost ? topLevelUpgradeCost = levelCost : null;
			ramCost > topRamUpgradeCost ? topRamUpgradeCost = ramCost : null;
			coreCost > topCoreUpgradeCost ? topCoreUpgradeCost = coreCost : null;
		}

		if (newNodeCost < topLevelUpgradeCost && newNodeCost < topRamUpgradeCost
			&& newNodeCost < topCoreUpgradeCost) {
			if (newNodeCost < maxAllowance) {
				var purchasedNode = ns.hacknet.purchaseNode();
				maxAllowance = allowance(ns, rate);
				ns.print('Purchased node ' + purchasedNode);
				var levelCost = ns.hacknet.getLevelUpgradeCost(purchasedNode, levelInt);
				var ramCost = ns.hacknet.getRamUpgradeCost(purchasedNode, 1);
				var coreCost = ns.hacknet.getCoreUpgradeCost(purchasedNode, 1);

				while (levelCost < newNodeCost && levelCost < maxAllowance) {
					var status = levelCost < maxAllowance ? ns.hacknet.upgradeLevel(i, levelInt) : false;
					if (status == true) {
						ns.print(`n: ${i} - buying levels x 10`);
						levelCost = ns.hacknet.getLevelUpgradeCost(i, 10);
						maxAllowance = allowance(ns, rate);
					} else {
						break;
					}
				}

				while (ramCost < newNodeCost && ramCost < maxAllowance) {
					var status = ramCost < maxAllowance ? ns.hacknet.upgradeRam(i, 1) : false;
					if (status == true) {
						ns.print(`n: ${i} - buying Ram`);
						ramCost = ns.hacknet.getRamUpgradeCost(i, 1);
						maxAllowance = allowance(ns, rate);
					} else {
						break;
					}
				}

				while (coreCost < newNodeCost && coreCost < maxAllowance) {
					var status = coreCost < maxAllowance ? ns.hacknet.upgradeCore(i, 1) : false;
					if (status == true) {
						ns.print(`n: ${i} - buying Cores`);
						coreCost = ns.hacknet.getCoreUpgradeCost(i, 1);
						maxAllowance = allowance(ns, rate);
					} else {
						break;
					}
				}
			}
		} else {
			for (var i = 0; i < nodes; i++) {
				var levelCost = ns.hacknet.getLevelUpgradeCost(i, levelInt);
				var ramCost = ns.hacknet.getRamUpgradeCost(i, 1);
				var coreCost = ns.hacknet.getCoreUpgradeCost(i, 1);
				if (levelCost < ramCost && levelCost < coreCost) {
					while (levelCost < newNodeCost && levelCost < maxAllowance) {
						var status = levelCost < maxAllowance ? ns.hacknet.upgradeLevel(i, levelInt) : false;
						if (status == true) {
							ns.print(`n: ${i} - buying levels x 10`);
							levelCost = ns.hacknet.getLevelUpgradeCost(i, levelInt);
							maxAllowance = allowance(ns, rate);
						} else {
							break;
						}
					}

				} else if (ramCost < coreCost) {
					while (ramCost < newNodeCost && ramCost < maxAllowance) {
						var status = ramCost < maxAllowance ? ns.hacknet.upgradeRam(i, 1) : false;
						if (status == true) {
							ns.print(`n: ${i} - buying Ram`);
							ramCost = ns.hacknet.getRamUpgradeCost(i, 1);
							maxAllowance = allowance(ns, rate);
						}
						else {
							break;
						}
					}

				} else {
					while (coreCost < newNodeCost && coreCost < maxAllowance) {
						var status = coreCost < maxAllowance ? ns.hacknet.upgradeCore(i, 1) : false;
						if (status == true) {
							ns.print(`n: ${i} - buying Cores`);
							coreCost = ns.hacknet.getCoreUpgradeCost(i, 1);
							maxAllowance = allowance(ns, rate);
						} else {
							break;
						}
					}
				}
			}
		}

		await ns.sleep(1000);
	}
}