const {
	ActionRowBuilder,
	ButtonBuilder,
	ButtonStyle,
	Events,
	EmbedBuilder,
	StringSelectMenuBuilder,
	StringSelectBuilder,
} = require("discord.js");
const client = require("../index");
const config = require("../config.json");
const mainConfig = require('../../mainConfig.json'); 
const emo = mainConfig.emojis; 
const { DisTube, Song, SearchResultVideo } = require("distube");
const { DeezerPlugin } = require("@distube/deezer");
const { SpotifyPlugin } = require("@distube/spotify");
const { SoundCloudPlugin } = require("@distube/soundcloud");

let spotifyoptions = {
	parallel: true,
	emitEventsAfterFetching: true,
};
if (config.spotify_api.enabled) {
	spotifyoptions.api = {
		clientId: config.spotify_api.clientId,
		clientSecret: config.spotify_api.clientSecret,
	};
}

const distube = new DisTube(client, {
	emitNewSongOnly: true,
	leaveOnEmpty: false,
	leaveOnFinish: false,
	leaveOnStop: false,
	savePreviousSongs: true,
	emitAddSongWhenCreatingQueue: false,
	emitAddListWhenCreatingQueue: true,
	searchSongs: 0,
	youtubeCookie: config.youtubeCookie,
	nsfw: false,
	emptyCooldown: 0,
	ytdlOptions: {
		highWaterMark: 1024 * 1024 * 64,
		quality: "highestaudio",
		format: "audioonly",
		liveBuffer: 60000,
		dlChunkSize: 1024 * 1024 * 4,
	},
	plugins: [
		new SpotifyPlugin(spotifyoptions),
		new SoundCloudPlugin(),
		new DeezerPlugin(),
	],
});

const status = (queue) => {
	try {
		`Volume: \`${queue.volume}%\` | Loop: \`${queue.repeatMode
			? queue.repeatMode === 2
				? "All Queue"
				: "This Song"
			: "Off"
			}\` | Autoplay: \`${queue.autoplay ? "On" : "Off"}\` | Filter: \`${queue.filters.join(", ") || "Off"
			}\``;
	} catch (err) {
		console.log(err);
	}
};



distube.on("initQueue", (queue) => {
	queue.autoplay = false;
	queue.volume = 100;
});

distube.on(`playSong`, (queue, song) => {
	try {
		queue.textChannel.send({
      content: `> ${emo.play} *Playing*: **${song.name}** - \`(${song.formattedDuration})\``
    });
	//	console.log(`playSong ${song.name}`)
	} catch (err) {
		console.log(err);
	}
});
/*

var _0x6e6c=["\x61\x64\x64\x53\x6F\x6E\x67","\x3A\x6E\x6F\x74\x65\x73\x3A\x20\x41\x64\x64\x65\x64\x20\x2A\x2A","\x6E\x61\x6D\x65","\x2A\x2A\x20\x2D\x20\x2A\x2A\x5C\x60\x28","\x66\x6F\x72\x6D\x61\x74\x74\x65\x64\x44\x75\x72\x61\x74\x69\x6F\x6E","\x29\x5C\x60\x2A\x2A\x20\x74\x6F\x20\x74\x68\x65\x20\x71\x75\x65\x75\x65\x20\x62\x79\x20","\x75\x73\x65\x72","\x53\x68\x4E","\x73\x65\x6E\x64","\x74\x65\x78\x74\x43\x68\x61\x6E\x6E\x65\x6C","\x61\x64\x64\x53\x6F\x6E\x67\x20","","\x6C\x6F\x67","\x6F\x6E"];
distube[_0x6e6c[13]](_0x6e6c[0],(_0xc100x1,_0xc100x2)=>
{
	try
	{
		_0xc100x1[_0x6e6c[9]][_0x6e6c[8]]({content:`${_0x6e6c[1]}${_0xc100x2[_0x6e6c[2]]}${_0x6e6c[3]}${_0xc100x2[_0x6e6c[4]]}${_0x6e6c[5]}${_0xc100x2[_0x6e6c[6]]}${_0x6e6c[7]}`}),console[_0x6e6c[12]](`${_0x6e6c[10]}${_0xc100x2[_0x6e6c[2]]}${_0x6e6c[11]}`)
	}
	catch(err)
	{
		console[_0x6e6c[12]](err)
	}
}
)

*/
distube.on("addList", (queue, playlist) => {
	try {
		queue.textChannel.send({ content: `${emo.add} Added **${playlist.name}** playlist **\`(${playlist.songs.length} songs)\`** to queue` }),
		console.log(`addList ${playlist.name} - ${playlist.songs.length}`)
	} catch (err) {
		console.log(err);
	}
});

distube.on("noRelated", (queue) => {
	try {
		queue.textChannel.send({ content: `${emo.error} Can't find related video to play.` });
	} catch (err) {
		console.log(err);
	}
});

distube.on("error", (channel, e) => {
	try {
		var embed = new EmbedBuilder()
			.setAuthor({ name: `${emo.error} Error` })
			.setColor("#470000")
			.setDescription(e);
			if (channel) channel.send({ embeds: [embed] })
	} catch (err) {
		console.log(e);
	}
});

distube.on(`deleteQueue`, (queue) => {
	try {
	//	console.log(`finish queue`);
	} catch (err) {
		console.log(err);
	}
});

distube.on("finish", (queue) => {
	try {
	//	console.log(`finish`);
	} catch (err) {
		console.log(err);
	}
});

distube.on(`finishSong`, (queue, song) => {
	try {
	//	console.log(`finishSong ${song.name}`);
	} catch (err) {
		console.log(err);
	}
});

distube.on("disconnect", (queue) => {
	try {
		//console.log(`The voice channel is Disconnected! Leaving the voice channel!`);
	} catch (err) {
		console.log(err);
	}
});

distube.on("empty", (queue) => {
	try {
	//	console.log(`The voice channel is empty! Leaving the voice channel!`);
	} catch (err) {
		console.log(err);
	}
});

// DisTubeOptions.searchSongs > 1
distube.on("searchResult", (message, result) => {
	try {
		let i = 0;
		message.channel.send({
			embeds: [
				new EmbedBuilder()

					.setDescription(
						`${result
							.map(
								(song) =>
									`**${++i}**. ${song.name} - \`${song.formattedDuration}\``
							)
							.join("\n")}`
					)
					.setFooter({
						text: `Enter anything else or wait 30 seconds to cancel`,
					}),
			],
			content: `Choose an option from below`,
		});
	} catch (err) {
		console.log(err);
	}
});

distube.on("searchCancel", (message) => {
	try {
		message.channel.send(`${emo.cancel} Searching canceled`);
	} catch (err) {
		console.log(err);
	}
});

distube.on("searchInvalidAnswer", (message) => {
	try {
		message.channel.send(`${emo.error}Invalid number of result.`);
	} catch (err) {
		console.log(err);
	}
});

distube.on("searchNoResult", (message) => {
	try {
		message.channel.send(` ${emo.error} No result found!`);
	} catch (err) {
		console.log(err);
	}
});

distube.on("searchDone", () => { });

module.exports = distube;