export const macroList = {
	"Go home": ["home"],
	"Run": {
		"Show Servers": ["home", "run /gui/server-list.js"],
		"Show Process List": ["home", "run /gui/process-list.js"],
		"Run XP Farm": ["home", "run /oddfell0ws/xpfarm.js"],
		"Run Controller": ["home", "run /oddfell0ws/controller.js"],
		"Run Contracts": ["home", "run /oddfell0ws/contracts.js"],
		"Run Stats": ["home", "run /oddfell0ws/misc/stats.js"],
	},
	"Private Servers": {
		"List": ["home", "run /oddfell0ws/privateServers.js list"],
		"Analyze": ["home", "run /oddfell0ws/privateServers.js analyze"],
		"Plan": ["home", "run /oddfell0ws/privateServers.js plan"],
	},
	"Misc": {
		"Buy All Programs": ["buy BruteSSH.exe", "buy FTPCrack.exe", "buy HTTPWorm.exe", "buy SQLInject.exe", "buy relaySMTP.exe", "buy ServerProfiler.exe", "buy AutoLink.exe", "buy DeepscanV1.exe", "buy DeepscanV2.exe"],
		"Nuke and Backdoor": ["run BruteSSH.exe", "run FTPCrack.exe", "run HTTPWorm.exe", "run SQLInject.exe", "run relaySMTP.exe", "run NUKE.exe", "backdoor"],
	},
	"Kill": {
		"Kill Controller": ["home", "kill /oddfell0ws/controller.js"],
		"Kill Xp Farm": ["home", "kill /oddfell0ws/xpfarm.js"],
		"Kill Stats": ["home", "kill /oddfell0ws/misc/stats.js"],
	}
}