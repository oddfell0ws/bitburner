// from https://github.com/lethern/Bitburner_git_fetch

// if your github is https://github.com/Bob/Bitburner_lib, owner is Bob and repo is Bitburner_lib
let owner = "PhilipArmstead";
let repo = "BitBurner-Scripts";

// if you want your files to be saved nested in a directory, type it here. Or leave it empty
let prefixDirectory = '';

// probably no changes here
let configFileName = '/gui/config.txt';
let baseURL = 'https://raw.githubusercontent.com/';
let branch = 'main';

export async function main(ns) {
    let {
        dependencies
    } = await fetchConfig(ns);

    if (ns.getHostname() !== 'home') {
        throw new Error('Run the script from home');
    }

    if (prefixDirectory) {
        if (!prefixDirectory.endsWith('/')) prefixDirectory += '/';
        if (prefixDirectory[0] !== '/') prefixDirectory = '/' + prefixDirectory;
    }

    for (let i in dependencies) {
        let filename = dependencies[i];
        try {
            await getFileFromGH(ns, filename);
            ns.tprint(`Installed: ${filename} [${Number(i)+1}/${dependencies.length}]`);
        } catch (e) {
            ns.tprint(`ERROR: tried to download ${filename}: `, e.message);
            throw e;
        }
    }

    ns.tprint("Install complete!");
}

async function fetchConfig(ns) {
    try {
        await getFileFromGH(ns, configFileName);
        let json = ns.read(configFileName);
        return JSON.parse(json);
    } catch (e) {
        ns.tprint(`ERROR: Downloading and reading config file failed ${configFileName}`);
        throw e;
    }
}

async function getFileFromGH(ns, filepath) {
    let saveFilepath = prefixDirectory + filepath;

    await ns.scriptKill(saveFilepath, 'home')
    await ns.rm(saveFilepath)
    await ns.sleep(20)

    await githubReq(ns, filepath, saveFilepath);
}

async function githubReq(ns, filepath, saveFilepath) {
    let url = baseURL + owner + "/" + repo + "/" + branch + "/" + filepath;

    ns.print("Request to: " + url);
    await ns.wget(url + '?ts=' + new Date().getTime(), saveFilepath)
}
