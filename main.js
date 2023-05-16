const Discord = require("discord.js");
const mineflayer = require("mineflayer");
const client = new Discord.Client();


const PNGImage = require('pngjs-image');
const { MessageEmbed } = require('discord.js');


const ac = require("@antiadmin/anticaptchaofficial");
const fs = require('fs');
const c = require("config");
const { Console } = require("console");

ac.setAPIKey('КЛЮЧ_ДЛЯ_КАПЧИ');
var main_channel = "АЙДИ КАНАЛА БОТА";
var info_channel = "АЙДИ КАНАЛА ДЛЯ ВАРНОВ И БАНОВ";


let prefix = ".";
let bot;
var tpsPlugin = require('mineflayer-tps')(mineflayer)
var antiFaketps = false;
var firstrun = true;
var shouldNotify = false;
var otlagalo = false;
var lagStart;
var lagTime;
var member;
var listeningStats = false;
var statsKills;
var statsDeaths;
var statsDiscord;
var statsClan;
var statsDonate; 
var statsMoney;
var statsPT;
var statsKD;
var minTPS = 5;
var checking = false;
var statsOnline;
var statsName;
var randomPhrase = 0;
var checkname = '';
var needtocheck = false
var globalnickname;
var globalchannel;



const word3321312 = '@'
const word3333133 = 'Перезагрузка сервера'
const word33333 = 'Вы вылетели'
const wordstats1 = '╔'
const wordstats2 = '║'
const wordstats3 = '╚'
const wordnone = '/n'
const wordjoin2 = '▒'
const wordTPcringe = 'Телепортирование'
const wordlogin = 'login'
const wordreg = 'register'
const wordvoidite = 'Вы находитесь в Лобби'
const wordstats4 = '║  Привилегия:'
const wordstats5 = '║  Наиграно:'
const wordstats6 = '║  Деньги:'
const wordstats7 = '║  Клан:'
const wordstats8 = '║  Процент побед на пвп:'
const wordstats9 = '║  Кол-во убийств:'
const wordstats10 = '║  Кол-во смертей:'
const wordstats11 = '║  Дискорд:'
const wordstats12 = '║  Статус:'
const wordstats13 = '|'
const wordstats14 = 'Игрок с таким ником'
const word3 = 'Хелпер'
const word4 = 'варн'
const word5 = 'разбанил'
const word6 = 'навсегда'
const word7 = 'IP'
const word8 = 'забанил'
const word9 = 'привязать'
const word32 = 'мут'
const word33 = 'снял мут'
const word10 = 'Создатель'
const word11 = 'БОГ'
const word12 = 'ПРЕЗИДЕНТ'
const word13 = 'ГОСПОДЬ'
const word14 = 'СПОНСОР'
const word15 = 'Основатель'
const word16 = 'БАРОН'
const word17 = 'Владелец'
const word18 = 'ВЛАДЫКА'
const word19 = 'Лорд'
const word20 = 'Цезарь'
const word21 = 'Вип'
const word22 = 'СУЛТАН'
const word23 = 'Привилегия'
const word24 = 'Игрок'
const word31 = 'ПРАВИТЕЛЬ'
const word228 = 'получает'
const word25 = 'Премиум'
const word26 = 'Креатив'
const word27 = 'Админ'
const word28 = 'Гл.Админ'
const word29 = 'ВЛАСТЕЛИН'
const word30 = 'МАЖОР'

const jndi = '$'

client.on("ready", async => {
    let channel = client.channels.cache.get(main_channel)
    if (!channel) return;
    channel.send(`Дискорд бот активен`)
    channel.send(`Введите никнейм`)
    firstrun = true;
})



client.on("message", function(message) {
    if (message.author.bot) return;
    if(firstrun && message.channel.id == main_channel){
        let nig = message.content;
        createBot(nig)
        firstrun = false;
        return;
    }

    let saymsg = message.content

    if (!message.content.startsWith(prefix) && message.channel.id === main_channel){
        bot.chat(`${saymsg}`)  
    }


    if (!message.content.startsWith(prefix)) return;
    const commandBody = message.content.slice(prefix.length);
    const args = commandBody.split(' ');
    const command = args.shift().toLowerCase();
    if (command === "online") {
        let channel = client.channels.cache.get(main_channel)
        channel.send(Object.keys(bot.players).join(", "))  
    }
    if (command === "join") {
        join();
    }
	if (command === "tps"){
		try{
			member = message.member;
			let channel = message.channel;
			globalchannel = message.channel;
			channel.send("Текущий TPS на школопомойке - " + bot.getTps())
		} catch {

		}
	}
	if (command === "привязать") {
        member = message.member;
		let channel = message.channel;
		globalchannel = message.channel;
        channel.send(`Зайди на mcfunny.su и напиши !привязать в чат или лс боту (/w ` + bot.username + " привязать)")
    }
    if (command === "newbot") {
		restartBot()
    }
	if( command === "stats"){
		try{
			var niggg = message.content.toString().replace(".stats ","")
			if(!niggg) return
			if(niggg.toString().includes(jndi)) return;
			statsName = niggg
			listeningStats = true
			bot.chat(`/stats ${niggg}`)
		} catch(ex) {

		}
	}
	if( command === "seen"){
		message.channel.send("Эта команда отключена!")
	}
});

function restartBot(){
	bot.end()
	let channel = client.channels.cache.get(main_channel)

	channel.send(`Новая сессия активна`)
	channel.send(`Введите никнейм`)
	firstrun = true;
	return;
}
function restartBot2(){
	bot.end()
	createBot("JenroMillionaire")
}

function join(){
    bot.setQuickBarSlot(0)
    bot.activateItem()
	setTimeout(() => {
		antiFaketps = true;
	}, 60000)
}




function createBot (uname) {
    bot = mineflayer.createBot({
        host: 'mcfunny.su',
        username: uname,
        version   : '1.12.2',
    })

	bot.loadPlugin(tpsPlugin) 

    bot.on('login', async => {
        let channel = client.channels.cache.get(main_channel)
        if (!channel) return;
        channel.send(`Зашел на фангейм`)
    } )


    bot.on("message", message => {
		message = "| " + message

        let channel = client.channels.cache.get(main_channel)
        if (!channel) return;

		if(!message.includes(word3321312) && !message.includes(wordstats1) && !message.includes(wordstats2) && !message.includes(wordstats3) && !message.includes(wordjoin2) && !(message === (wordnone))){
        	channel.send(`${message}`)
		}
		
		console.log(`${message}`)


		if(message.includes(wordstats1) || message.includes(wordstats3) || message.includes(wordstats2)){
			if(listeningStats){
				if(message.includes(wordstats4)){
					statsDonate  = message.toString().replace(wordstats4,"")
					statsDonate = "```" + statsDonate.toString().replace(wordstats13,"") + "```"
				}
				if(message.includes(wordstats5)){
					statsPT  = message.toString().replace(wordstats5,"")
					statsPT = "```" + statsPT.toString().replace(wordstats13,"") + "```"
				}
				if(message.includes(wordstats6)){
					statsMoney  = message.toString().replace(wordstats6,"")
					statsMoney = "```" + statsMoney.toString().replace(wordstats13,"") + "```"
				}
				if(message.includes(wordstats7)){
					statsClan  = message.toString().replace(wordstats7,"")
					statsClan = "```" + statsClan.toString().replace(wordstats13,"") + "```"
				}
				if(message.includes(wordstats8)){
					statsKD  = message.toString().replace(wordstats8,"")
					statsKD = "```" + statsKD.toString().replace(wordstats13,"") + "```"
				}
				if(message.includes(wordstats9)){
					statsKills = message.toString().replace(wordstats9,"")
					statsKills = "```" + statsKills.toString().replace(wordstats13,"") + "```"
				}
				if(message.includes(wordstats10)){
					statsDeaths = message.toString().replace(wordstats10,"")
					statsDeaths = "```" + statsDeaths.toString().replace(wordstats13,"") + "```"
				}
				if(message.includes(wordstats11)){
					statsDiscord = message.toString().replace(wordstats11,"")
					statsDiscord = "```" + statsDiscord.toString().replace(wordstats13,"") + "```"
				}
				if(message.includes(wordstats12)){
					statsOnline = message.toString().replace(wordstats12,"")
					statsOnline = "```" + statsOnline.toString().replace(wordstats13,"") + "```"
					sendStats()
					listeningStats = false
				}
			}

		}
		if(message.includes(wordstats14)){
			sendStatsFail()
			listeningStats = false
		}
		if(message.includes(word33333)){
			join();
		}	
		if(message.includes(wordTPcringe)){
			bot.chat(`/warp pvp`);
		}	
		if(message.includes(wordlogin)){
			bot.chat(`/l ragesquad`);
		}	
		if(message.includes(wordreg)){
			bot.chat(`/reg ragesquad`);
		}	
		if(message.includes(wordvoidite)){
			join()
		}

		if(message.includes(word3333133)){
			setTimeout(function() {join()}, 60000);
		}	

		if(needtocheck) {
			const word = 'Статистика'
			const word2 = 'сети'
			if(message.includes(word2)){
				sendMsgVanish(checkname)
				checkname = ''
				needtocheck = false
			} else if(message.includes(word)) {
				sendMsgNotVanish(checkname)
				checkname = ''
				needtocheck = false
			}
		}

		if(message.includes(word9)){
			checking = true
			var array = bot.players
			for(const [key, value] of Object.entries(array)){
				if(message.includes(key)){
					globalnickname = key
					bot.chat(`/stats ` + key)
				}
			}
		}


		if(checking){
			if(message.includes(word23)){
				if(message.includes(word25)){
					try{
						member.roles.add("АЙДИ РОЛИ");
						try{
							member.setNickname(member.displayName + " - " + globalnickname)
						} catch {
							globalchannel.send("Ваш ник слишком длинный!")
						}
					} catch {}
					globalchannel.send("Выдана роль " + word25)
					member = "s";
					checking = false
				}
				if(message.includes(word31)){
					try{
						member.roles.add("АЙДИ РОЛИ");
						try{
							member.setNickname(member.displayName + " - " + globalnickname)
						} catch {
							globalchannel.send("Ваш ник слишком длинный!")
						}
					} catch {}
					globalchannel.send("Выдана роль " + word31)
					member = "s";
					checking = false
				}
				if(message.includes(word26)){
					try{
						member.roles.add("АЙДИ РОЛИ");
						try{
							member.setNickname(member.displayName + " - " + globalnickname)
						} catch {
							globalchannel.send("Ваш ник слишком длинный!")
						}
					} catch {}
					globalchannel.send("Выдана роль " + word26)
					member = "s";
					checking = false
				}

				if(message.includes(word27)){
						try{
							member.roles.add("АЙДИ РОЛИ");
							try{
								member.setNickname(member.displayName + " - " + globalnickname)
							} catch {
								globalchannel.send("Ваш ник слишком длинный!")
							}
						} catch {}
						globalchannel.send("Выдана роль " + word27)
						member = "s";
						checking = false
				}
				if(message.includes(word28)){
					if(!message.includes(word27)){
						try{
							member.roles.add("АЙДИ РОЛИ");
							try{
								member.setNickname(member.displayName + " - " + globalnickname)
							} catch {
								globalchannel.send("Ваш ник слишком длинный!")
							}
						} catch {}
						globalchannel.send("Выдана роль " + word28)
						member = "s";
						checking = false
					}
				}
				if(message.includes(word29)){
					try{
						member.roles.add("АЙДИ РОЛИ");
						try{
							member.setNickname(member.displayName + " - " + globalnickname)
						} catch {
							globalchannel.send("Ваш ник слишком длинный!")
						}
					} catch {}
					globalchannel.send("Выдана роль " + word29)
					member = "s";
					checking = false
				}
				if(message.includes(word30)){
					try{
						member.roles.add("АЙДИ РОЛИ");
						try{
							member.setNickname(member.displayName + " - " + globalnickname)
						} catch {
							globalchannel.send("Ваш ник слишком длинный!")
						}
					} catch {}
					globalchannel.send("Выдана роль " + word30)
					member = "s";
					checking = false
				}
				if(message.includes(word24)){
					try{
						member.roles.add("АЙДИ РОЛИ");
						try{
							member.setNickname(member.displayName + " - " + globalnickname)
						} catch {
							globalchannel.send("Ваш ник слишком длинный!")
						}
					} catch {}
					if(member != "s")
						globalchannel.send("Выдана роль " + word24)

					member = "s";
					checking = false
				}
				if(message.includes(word10)){
					try{
						member.roles.add("АЙДИ РОЛИ");
						try{
							member.setNickname(member.displayName + " - " + globalnickname)
						} catch {
							globalchannel.send("Ваш ник слишком длинный!")
						}
					} catch {}
					globalchannel.send("Выдана роль " + word10)
					member = "s";
					checking = false

				}
				if(message.includes(word11)){
					try{
						member.roles.add("АЙДИ РОЛИ");
						try{
							member.setNickname(member.displayName + " - " + globalnickname)
						} catch {
							globalchannel.send("Ваш ник слишком длинный!")
						}
						globalchannel.send("Выдана роль " + word11)
					} catch {}
					member = "s";
					checking = false
				}
				if(message.includes(word12) && !message.includes(word228)){
					try{
						member.roles.add("АЙДИ РОЛИ");
						try{
							member.setNickname(member.displayName + " - " + globalnickname)
						} catch {
							globalchannel.send("Ваш ник слишком длинный!")
						}
						globalchannel.send("Выдана роль " + word12)

					} catch {}
					member = "s";
					checking = false
				}
				if(message.includes(word22)){
					try{
						member.roles.add("АЙДИ РОЛИ");
						try{
							member.setNickname(member.displayName + " - " + globalnickname)
						} catch {
							globalchannel.send("Ваш ник слишком длинный!")
						}
						globalchannel.send("Выдана роль " + word22)

					} catch {}
					member = "s";
					checking = false
				}
				if(message.includes(word21)){
					try{
						member.roles.add("АЙДИ РОЛИ");
						try{
							member.setNickname(member.displayName + " - " + globalnickname)
						} catch {
							globalchannel.send("Ваш ник слишком длинный!")
						}
						globalchannel.send("Выдана роль " + word21)

					} catch {}
					member = "s";
					checking = false
				}
				if(message.includes(word13)){
					try{
						member.roles.add("АЙДИ РОЛИ");
						try{
							member.setNickname(member.displayName + " - " + globalnickname)
						} catch {
							globalchannel.send("Ваш ник слишком длинный!")
						}
						globalchannel.send("Выдана роль " + word13)

					} catch {}
					member = "s";
					checking = false

				}
				if(message.includes(word14)){
					try{
						member.roles.add("АЙДИ РОЛИ");
						try{
							member.setNickname(member.displayName + " - " + globalnickname)
						} catch {
							globalchannel.send("Ваш ник слишком длинный!")
						}
						globalchannel.send("Выдана роль " + word14)

					} catch {}
					member = "s";
					checking = false

				}
				if(message.includes(word20)){
					try{
						member.roles.add("АЙДИ РОЛИ");
						try{
							member.setNickname(member.displayName + " - " + globalnickname)
						} catch {
							globalchannel.send("Ваш ник слишком длинный!")
						}
						globalchannel.send("Выдана роль " + word20)

					} catch {}
					member = "s";
					checking = false

				}
				if(message.includes(word15)){
					try{
						member.roles.add("АЙДИ РОЛИ");
						try{
							member.setNickname(member.displayName + " - " + globalnickname)
						} catch {
							globalchannel.send("Ваш ник слишком длинный!")
						}
						globalchannel.send("Выдана роль " + word15)

					} catch {}
					member = "s";
					checking = false

				}
				if(message.includes(word16)){
					try{
						member.roles.add("АЙДИ РОЛИ");
						try{
							member.setNickname(member.displayName + " - " + globalnickname)
						} catch {
							globalchannel.send("Ваш ник слишком длинный!")
						}word331
						globalchannel.send("Выдана роль " + word16)

					} catch {}
					member = "s";
					checking = false

				}
				if(message.includes(word17)){
					try{
						member.roles.add("АЙДИ РОЛИ");
						try{
							member.setNickname(member.displayName + " - " + globalnickname)
						} catch {
							globalchannel.send("Ваш ник слишком длинный!")
						}
						globalchannel.send("Выдана роль " + word17)

					} catch {}
					member = "s";
					checking = false

				}
				if(message.includes(word18)){
					try{
						member.roles.add("АЙДИ РОЛИ");
						try{
							member.setNickname(member.displayName + " - " + globalnickname)
						} catch {
							globalchannel.send("Ваш ник слишком длинный!")
						}
						globalchannel.send("Выдана роль " + word18)
					} catch {}
					member = "s";
					checking = false

				}
				if(message.includes(word19)){
					try{
						member.roles.add("АЙДИ РОЛИ");
						try{
							member.setNickname(member.displayName + " - " + globalnickname)
						} catch {
							globalchannel.send("Ваш ник слишком длинный!")
						}
						globalchannel.send("Выдана роль " + word19)
					} catch {}
					member = "s";
					checking = false

				}
			}
		}
		if(message.includes(word3)){
			if(message.includes(word4)){
				let channel = client.channels.cache.get(info_channel)
				if (!channel) return;
				const exampleEmbed = new MessageEmbed()
				.setColor("fca503")
				.setTitle("WARN")
				.setDescription(message)
				channel.send(exampleEmbed);	
			} else if(message.includes(word5)){
				let channel = client.channels.cache.get(info_channel)
				if (!channel) return;
				const exampleEmbed = new MessageEmbed()
				.setColor("0bfc03")
				.setTitle("UNBAN")
				.setDescription(message)
				channel.send(exampleEmbed);	
			}else if(message.includes(word6)){
				let channel = client.channels.cache.get(info_channel)
				if (!channel) return;
				const exampleEmbed = new MessageEmbed()
				.setColor("fc2003")
				.setTitle("HARD BAN")
				.setDescription(message)
				channel.send(exampleEmbed);	
			}else if(message.includes(word7)){
				let channel = client.channels.cache.get(info_channel)
				if (!channel) return;
				const exampleEmbed = new MessageEmbed()
				.setColor("8c03fc")
				.setTitle("IP BAN")
				.setDescription(message)
				channel.send(exampleEmbed);	
			}else if(message.includes(word8)){
				let channel = client.channels.cache.get(info_channel)
				if (!channel) return;
				const exampleEmbed = new MessageEmbed()
				.setColor("dffc03")
				.setTitle("BAN")
				.setDescription(message)
				channel.send(exampleEmbed);	
			}else if(message.includes(word33)){
				let channel = client.channels.cache.get(info_channel)
				if (!channel) return;
				const exampleEmbed = new MessageEmbed()
				.setColor("00fffb")
				.setTitle("UNMUTE")
				.setDescription(message)
				channel.send(exampleEmbed);	
			}else if(message.includes(word32)){
				let channel = client.channels.cache.get(info_channel)
				if (!channel) return;
				const exampleEmbed = new MessageEmbed()
				.setColor("00fffb")
				.setTitle("MUTE")
				.setDescription(message)
				channel.send(exampleEmbed);	
			}
		} 

		if(!antiFaketps) return;
		
		if(bot.getTps() > 15){
			shouldNotify = true;
			if(otlagalo){
				let channel = client.channels.cache.get(info_channel)
				if (!channel) return;

				if(!otlagalo)return;

				lagTime =  Date.now() - lagStart;
				const exampleEmbed = new MessageEmbed()
				.setColor("f4fc03")
				.setTitle("#LAG OFF")
				.setDescription("Фангейм воскрес спустя " + lagTime + " мс")
				channel.send(exampleEmbed);	
				minTPS = 5;
				otlagalo = false;
			}
		}

		if(bot.getTps() < 5){
			if(bot.getTps() < 1) return;
			if(!shouldNotify) return;
			try{
				lagStart = Date.now()
				let channel = client.channels.cache.get(info_channel)
				if (!channel) return;
				const exampleEmbed = new MessageEmbed()
				.setColor("f4fc03")
				.setTitle("#LAG ON")
				.setDescription("Пизда фангейму - " + bot.getTps() + "TPS")
				channel.send(exampleEmbed);	
				shouldNotify = false
				otlagalo =true;
			} catch {

			}
		}
		if(bot.getTps() < minTPS){
			try{
				lagStart = Date.now()
				let channel = client.channels.cache.get(info_channel)
				if (!channel) return;
				const exampleEmbed = new MessageEmbed()
				.setColor("f4fc03")
				.setTitle("#LAG")
				.setDescription("TPS попустился до " + bot.getTps())
				channel.send(exampleEmbed);	

				minTPS = bot.getTps()
			} catch {

			}
		}

    })
    
    bot.on('kicked', (reason) => {
        console.log(`Меня кикнули!! причина : ${reason}`)
        let channel = client.channels.cache.get(main_channel)
        if (!channel) return;
        channel.send(`Меня кикнули!! причина :${reason}`)
		restartBot2();
    })

	
    bot.on('playerJoined', (player) => {
		if (player.username == 'Finn_Edman'){
			let channel = client.channels.cache.get(info_channel)
			if (!channel) return;

			const exampleEmbed = new MessageEmbed()
			.setColor("FFF700")
			.setTitle("STAFF ALERT")
			.setDescription(`<@&1030808938146430976>, Хелпер ${player.username} зашел на сервер/вышел из ваниша!`)
			.setThumbnail("https://minotar.net/helm/" + player.username+ "/100.png")
			channel.send(exampleEmbed);	
		}
		if (player.username == 'Valentin_Force'){
			let channel = client.channels.cache.get(info_channel)
			if (!channel) return;
			const exampleEmbed = new MessageEmbed()
			.setColor("FFF700")
			.setTitle("STAFF ALERT")
			.setDescription(`<@&1030808938146430976>, Хелпер ${player.username} зашел на сервер/вышел из ваниша!`)
			.setThumbnail("https://minotar.net/helm/" + player.username+ "/100.png")
			channel.send(exampleEmbed);	
		}
		if (player.username == 'BarsLan_'){
			let channel = client.channels.cache.get(info_channel)
			if (!channel) return;
			const exampleEmbed = new MessageEmbed()
			.setColor("FFF700")
			.setTitle("STAFF ALERT")
			.setDescription(`<@&1030808938146430976>, Хелпер ${player.username} зашел на сервер/вышел из ваниша!`)
			.setThumbnail("https://minotar.net/helm/" + player.username+ "/100.png")
			channel.send(exampleEmbed);	
		}
		if (player.username == 'banned6661'){
			let channel = client.channels.cache.get(info_channel)
			if (!channel) return;
			const exampleEmbed = new MessageEmbed()
			.setColor("FFF700")
			.setTitle("STAFF ALERT")
			.setDescription(`<@&1030808938146430976>, Хелпер ${player.username} зашел на сервер/вышел из ваниша!`)
			.setThumbnail("https://minotar.net/helm/" + player.username+ "/100.png")
			channel.send(exampleEmbed);	
		}
		if (player.username == 'LordAvernus'){
			let channel = client.channels.cache.get(info_channel)
			if (!channel) return;
			const exampleEmbed = new MessageEmbed()
			.setColor("FFF700")
			.setTitle("STAFF ALERT")
			.setDescription(`<@&1030808938146430976>, Хелпер ${player.username} зашел на сервер/вышел из ваниша!`)
			.setThumbnail("https://minotar.net/helm/" + player.username+ "/100.png")
			channel.send(exampleEmbed);	
		}
		if (player.username == 'Bandito'){
			let channel = client.channels.cache.get(info_channel)
			if (!channel) return;
			const exampleEmbed = new MessageEmbed()
			.setColor("FFF700")
			.setTitle("STAFF ALERT")
			.setDescription(`<@&1030808938146430976>, Хелпер ${player.username} зашел на сервер/вышел из ваниша!`)
			.setThumbnail("https://minotar.net/helm/" + player.username+ "/100.png")
			channel.send(exampleEmbed);	
		}
		if (player.username == 'Vnature'){
			let channel = client.channels.cache.get(info_channel)
			if (!channel) return;
			const exampleEmbed = new MessageEmbed()
			.setColor("FFF700")
			.setTitle("STAFF ALERT")
			.setDescription(`<@&1030808938146430976>, Хелпер ${player.username} зашел на сервер/вышел из ваниша!`)
			.setThumbnail("https://minotar.net/helm/" + player.username+ "/100.png")
			channel.send(exampleEmbed);	
		}
		if (player.username === 'SevaPozik' 
		|| player.username === 'Ken' 
		|| player.username === 'Valentin_Force' 
		|| player.username === 'hohohohoho' 
		|| player.username === 'qwesxzas111' 
		|| player.username === 'BarsLan_' 
		|| player.username === 'arsik2005'){

			if(randomPhrase == 6){
				randomPhrase = 0
			} 
			if(randomPhrase == 0){
				bot.chat(`!${player.username} Добро пожаловать на фг!`)
			} else 
			if(randomPhrase == 1){
				bot.chat(`!${player.username} Привет!`)
			} else
			if(randomPhrase == 2){
				bot.chat(`!${player.username} qq`)
			} else
			if(randomPhrase == 3){
				bot.chat(`!${player.username} привки`)
			} else
			if(randomPhrase == 4){
				bot.chat(`!${player.username} привет дашь ТандерХак?`)
			} else
			if(randomPhrase == 5){
				bot.chat(`!${player.username} приветик`)
			}
			randomPhrase = randomPhrase + 1
		}
	})

	bot.on('playerLeft', (player) => {
		if (player.username == 'BarsLan_'){
			checkname = 'BarsLan_'
			needtocheck = true
			bot.chat(`/stats BarsLan_`)
		}
		if (player.username == 'Finn_Edman'){
			checkname = 'Finn_Edman'
			needtocheck = true
			bot.chat(`/stats Finn_Edman`)

		}
		if (player.username == 'LordAvernus'){
			checkname = 'LordAvernus'
			needtocheck = true
			bot.chat(`/stats LordAvernus`)

		}
		if (player.username == 'banned6661'){
			checkname = 'banned6661'
			needtocheck = true
			bot.chat(`/stats banned6661`)

		}
		if (player.username == 'Valentin_Force'){
			checkname = 'Valentin_Force'
			needtocheck = true
			bot.chat(`/stats Valentin_Force`)
		}
		if (player.username == 'Bandito'){
			checkname = 'Bandito'
			needtocheck = true
			bot.chat(`/stats Bandito`)

		}
		if (player.username == 'Vnature'){
			checkname = 'Vnature'
			needtocheck = true
			bot.chat(`/stats Vnature`)

		}
	})

    bot.on('spawn', function() {
        setTimeout(function() {
           bot.setQuickBarSlot(0)
           bot.activateItem()
        }, 15000);
    });
    
    var firsopen = true;
    
    bot.on('windowOpen', (window) => {
        if(firsopen){
            bot.clickWindow(2,0,0)
            firsopen = false;
        } else {
            setTimeout(function() {
                bot.clickWindow(3,0,0)
            }, 2000);
            firsopen = true;
        }
    })
    
    
    
    bot._client.on('map', ({ data }) => {
        if(!data) return;
        
        const size = Math.sqrt(data.length);
        const image = PNGImage.createImage(size, size);
    
    
        for(let x = 0; x < size; x++) {
            for(let z = 0; z < size; z++) {
    
                const colorId = data[x + (z * size)];
                image.setAt(x, z, getColor(colorId));
    
            }
        }
    
        image.writeImage(`${__dirname}/captha.png`, function (err) {
            if (err) throw err;
        });
    
        setTimeout(function() {
            let channel = client.channels.cache.get(main_channel)
            channel.send('Пинаем рабов чтоб решили капчу', {
                files: [
                    "./captha.png"
                ]
            });

			const captcha = fs.readFileSync(`${__dirname}/captha.png`, { encoding: 'base64' });
			ac.solveImage(captcha, true)
			.then(text => {
				bot.chat(text)
				let channel = client.channels.cache.get(main_channel)
				channel.send("Рабы решили капчу ! Ответ был " + text)
			})
			.catch(error => console.log('test received error '+error));

        }, 200);
     
    });
    
	bot.on('error', err => {
		console.log(err)
		restartBot2()
	})
}



function getColor(colorId) {
	const colors = [
		{ red: 0, green: 0, blue: 0, alpha: 255 },
		{ red: 89, green: 125, blue: 39, alpha: 255 },
		{ red: 109, green: 153, blue: 48, alpha: 255 },
		{ red: 127, green: 178, blue: 56, alpha: 255 },
		{ red: 67, green: 94, blue: 29, alpha: 255 },
		{ red: 174, green: 164, blue: 115, alpha: 255 },
		{ red: 213, green: 201, blue: 140, alpha: 255 },
		{ red: 247, green: 233, blue: 163, alpha: 255 },
		{ red: 130, green: 123, blue: 86, alpha: 255 },
		{ red: 140, green: 140, blue: 140, alpha: 255 },
		{ red: 171, green: 171, blue: 171, alpha: 255 },
		{ red: 199, green: 199, blue: 199, alpha: 255 },
		{ red: 105, green: 105, blue: 105, alpha: 255 },
		{ red: 180, green: 0, blue: 0, alpha: 255 },
		{ red: 220, green: 0, blue: 0, alpha: 255 },
		{ red: 255, green: 0, blue: 0, alpha: 255 },
		{ red: 135, green: 0, blue: 0, alpha: 255 },
		{ red: 112, green: 112, blue: 180, alpha: 255 },
		{ red: 138, green: 138, blue: 220, alpha: 255 },
		{ red: 160, green: 160, blue: 255, alpha: 255 },
		{ red: 84, green: 84, blue: 135, alpha: 255 },
		{ red: 117, green: 117, blue: 117, alpha: 255 },
		{ red: 144, green: 144, blue: 144, alpha: 255 },
		{ red: 167, green: 167, blue: 167, alpha: 255 },
		{ red: 88, green: 88, blue: 88, alpha: 255 },
		{ red: 0, green: 87, blue: 0, alpha: 255 },
		{ red: 0, green: 106, blue: 0, alpha: 255 },
		{ red: 0, green: 124, blue: 0, alpha: 255 },
		{ red: 0, green: 65, blue: 0, alpha: 255 },
		{ red: 180, green: 180, blue: 180, alpha: 255 },
		{ red: 220, green: 220, blue: 220, alpha: 255 },
		{ red: 255, green: 255, blue: 255, alpha: 255 },
		{ red: 135, green: 135, blue: 135, alpha: 255 },
		{ red: 115, green: 118, blue: 129, alpha: 255 },
		{ red: 141, green: 144, blue: 158, alpha: 255 },
		{ red: 164, green: 168, blue: 184, alpha: 255 },
		{ red: 86, green: 88, blue: 97, alpha: 255 },
		{ red: 106, green: 76, blue: 54, alpha: 255 },
		{ red: 130, green: 94, blue: 66, alpha: 255 },
		{ red: 151, green: 109, blue: 77, alpha: 255 },
		{ red: 79, green: 57, blue: 40, alpha: 255 },
		{ red: 79, green: 79, blue: 79, alpha: 255 },
		{ red: 96, green: 96, blue: 96, alpha: 255 },
		{ red: 112, green: 112, blue: 112, alpha: 255 },
		{ red: 59, green: 59, blue: 59, alpha: 255 },
		{ red: 45, green: 45, blue: 180, alpha: 255 },
		{ red: 55, green: 55, blue: 220, alpha: 255 },
		{ red: 64, green: 64, blue: 255, alpha: 255 },
		{ red: 33, green: 33, blue: 135, alpha: 255 },
		{ red: 100, green: 84, blue: 50, alpha: 255 },
		{ red: 123, green: 102, blue: 62, alpha: 255 },
		{ red: 143, green: 119, blue: 72, alpha: 255 },
		{ red: 75, green: 63, blue: 38, alpha: 255 },
		{ red: 180, green: 177, blue: 172, alpha: 255 },
		{ red: 220, green: 217, blue: 211, alpha: 255 },
		{ red: 255, green: 252, blue: 245, alpha: 255 },
		{ red: 135, green: 133, blue: 129, alpha: 255 },
		{ red: 152, green: 89, blue: 36, alpha: 255 },
		{ red: 186, green: 109, blue: 44, alpha: 255 },
		{ red: 216, green: 127, blue: 51, alpha: 255 },
		{ red: 114, green: 67, blue: 27, alpha: 255 },
		{ red: 125, green: 53, blue: 152, alpha: 255 },
		{ red: 153, green: 65, blue: 186, alpha: 255 },
		{ red: 178, green: 76, blue: 216, alpha: 255 },
		{ red: 94, green: 40, blue: 114, alpha: 255 },
		{ red: 72, green: 108, blue: 152, alpha: 255 },
		{ red: 88, green: 132, blue: 186, alpha: 255 },
		{ red: 102, green: 153, blue: 216, alpha: 255 },
		{ red: 54, green: 81, blue: 114, alpha: 255 },
		{ red: 161, green: 161, blue: 36, alpha: 255 },
		{ red: 197, green: 197, blue: 44, alpha: 255 },
		{ red: 229, green: 229, blue: 51, alpha: 255 },
		{ red: 121, green: 121, blue: 27, alpha: 255 },
		{ red: 89, green: 144, blue: 17, alpha: 255 },
		{ red: 109, green: 176, blue: 21, alpha: 255 },
		{ red: 127, green: 204, blue: 25, alpha: 255 },
		{ red: 67, green: 108, blue: 13, alpha: 255 },
		{ red: 170, green: 89, blue: 116, alpha: 255 },
		{ red: 208, green: 109, blue: 142, alpha: 255 },
		{ red: 242, green: 127, blue: 165, alpha: 255 },
		{ red: 128, green: 67, blue: 87, alpha: 255 },
		{ red: 53, green: 53, blue: 53, alpha: 255 },
		{ red: 65, green: 65, blue: 65, alpha: 255 },
		{ red: 76, green: 76, blue: 76, alpha: 255 },
		{ red: 40, green: 40, blue: 40, alpha: 255 },
		{ red: 108, green: 108, blue: 108, alpha: 255 },
		{ red: 132, green: 132, blue: 132, alpha: 255 },
		{ red: 153, green: 153, blue: 153, alpha: 255 },
		{ red: 81, green: 81, blue: 81, alpha: 255 },
		{ red: 53, green: 89, blue: 108, alpha: 255 },
		{ red: 65, green: 109, blue: 132, alpha: 255 },
		{ red: 76, green: 127, blue: 153, alpha: 255 },
		{ red: 40, green: 67, blue: 81, alpha: 255 },
		{ red: 89, green: 44, blue: 125, alpha: 255 },
		{ red: 109, green: 54, blue: 153, alpha: 255 },
		{ red: 127, green: 63, blue: 178, alpha: 255 },
		{ red: 67, green: 33, blue: 94, alpha: 255 },
		{ red: 36, green: 53, blue: 125, alpha: 255 },
		{ red: 44, green: 65, blue: 153, alpha: 255 },
		{ red: 51, green: 76, blue: 178, alpha: 255 },
		{ red: 27, green: 40, blue: 94, alpha: 255 },
		{ red: 72, green: 53, blue: 36, alpha: 255 },
		{ red: 88, green: 65, blue: 44, alpha: 255 },
		{ red: 102, green: 76, blue: 51, alpha: 255 },
		{ red: 54, green: 40, blue: 27, alpha: 255 },
		{ red: 72, green: 89, blue: 36, alpha: 255 },
		{ red: 88, green: 109, blue: 44, alpha: 255 },
		{ red: 102, green: 127, blue: 51, alpha: 255 },
		{ red: 54, green: 67, blue: 27, alpha: 255 },
		{ red: 108, green: 36, blue: 36, alpha: 255 },
		{ red: 132, green: 44, blue: 44, alpha: 255 },
		{ red: 153, green: 51, blue: 51, alpha: 255 },
		{ red: 81, green: 27, blue: 27, alpha: 255 },
		{ red: 17, green: 17, blue: 17, alpha: 255 },
		{ red: 21, green: 21, blue: 21, alpha: 255 },
		{ red: 25, green: 25, blue: 25, alpha: 255 },
		{ red: 13, green: 13, blue: 13, alpha: 255 },
		{ red: 176, green: 168, blue: 54, alpha: 255 },
		{ red: 215, green: 205, blue: 66, alpha: 255 },
		{ red: 250, green: 238, blue: 77, alpha: 255 },
		{ red: 132, green: 126, blue: 40, alpha: 255 },
		{ red: 64, green: 154, blue: 150, alpha: 255 },
		{ red: 79, green: 188, blue: 183, alpha: 255 },
		{ red: 92, green: 219, blue: 213, alpha: 255 },
		{ red: 48, green: 115, blue: 112, alpha: 255 },
		{ red: 52, green: 90, blue: 180, alpha: 255 },
		{ red: 63, green: 110, blue: 220, alpha: 255 },
		{ red: 74, green: 128, blue: 255, alpha: 255 },
		{ red: 39, green: 67, blue: 135, alpha: 255 },
		{ red: 0, green: 153, blue: 40, alpha: 255 },
		{ red: 0, green: 187, blue: 50, alpha: 255 },
		{ red: 0, green: 217, blue: 58, alpha: 255 },
		{ red: 0, green: 114, blue: 30, alpha: 255 },
		{ red: 91, green: 60, blue: 34, alpha: 255 },
		{ red: 111, green: 74, blue: 42, alpha: 255 },
		{ red: 129, green: 86, blue: 49, alpha: 255 },
		{ red: 68, green: 45, blue: 25, alpha: 255 },
		{ red: 79, green: 1, blue: 0, alpha: 255 },
		{ red: 96, green: 1, blue: 0, alpha: 255 },
		{ red: 112, green: 2, blue: 0, alpha: 255 },
		{ red: 59, green: 1, blue: 0, alpha: 255 },
		{ red: 147, green: 124, blue: 113, alpha: 255 },
		{ red: 180, green: 152, blue: 138, alpha: 255 },
		{ red: 209, green: 177, blue: 161, alpha: 255 },
		{ red: 110, green: 93, blue: 85, alpha: 255 },
		{ red: 112, green: 57, blue: 25, alpha: 255 },
		{ red: 137, green: 70, blue: 31, alpha: 255 },
		{ red: 159, green: 82, blue: 36, alpha: 255 },
		{ red: 84, green: 43, blue: 19, alpha: 255 },
		{ red: 105, green: 61, blue: 76, alpha: 255 },
		{ red: 128, green: 75, blue: 93, alpha: 255 },
		{ red: 149, green: 87, blue: 108, alpha: 255 },
		{ red: 78, green: 46, blue: 57, alpha: 255 },
		{ red: 79, green: 76, blue: 97, alpha: 255 },
		{ red: 96, green: 93, blue: 119, alpha: 255 },
		{ red: 112, green: 108, blue: 138, alpha: 255 },
		{ red: 59, green: 57, blue: 73, alpha: 255 },
		{ red: 131, green: 93, blue: 25, alpha: 255 },
		{ red: 160, green: 114, blue: 31, alpha: 255 },
		{ red: 186, green: 133, blue: 36, alpha: 255 },
		{ red: 98, green: 70, blue: 19, alpha: 255 },
		{ red: 72, green: 82, blue: 37, alpha: 255 },
		{ red: 88, green: 100, blue: 45, alpha: 255 },
		{ red: 103, green: 117, blue: 53, alpha: 255 },
		{ red: 54, green: 61, blue: 28, alpha: 255 },
		{ red: 112, green: 54, blue: 55, alpha: 255 },
		{ red: 138, green: 66, blue: 67, alpha: 255 },
		{ red: 160, green: 77, blue: 78, alpha: 255 },
		{ red: 84, green: 40, blue: 41, alpha: 255 },
		{ red: 40, green: 28, blue: 24, alpha: 255 },
		{ red: 49, green: 35, blue: 30, alpha: 255 },
		{ red: 57, green: 41, blue: 35, alpha: 255 },
		{ red: 30, green: 21, blue: 18, alpha: 255 },
		{ red: 95, green: 75, blue: 69, alpha: 255 },
		{ red: 116, green: 92, blue: 84, alpha: 255 },
		{ red: 135, green: 107, blue: 98, alpha: 255 },
		{ red: 71, green: 56, blue: 51, alpha: 255 },
		{ red: 61, green: 64, blue: 64, alpha: 255 },
		{ red: 75, green: 79, blue: 79, alpha: 255 },
		{ red: 87, green: 92, blue: 92, alpha: 255 },
		{ red: 46, green: 48, blue: 48, alpha: 255 },
		{ red: 86, green: 51, blue: 62, alpha: 255 },
		{ red: 105, green: 62, blue: 75, alpha: 255 },
		{ red: 122, green: 73, blue: 88, alpha: 255 },
		{ red: 64, green: 38, blue: 46, alpha: 255 },
		{ red: 53, green: 43, blue: 64, alpha: 255 },
		{ red: 65, green: 53, blue: 79, alpha: 255 },
		{ red: 76, green: 62, blue: 92, alpha: 255 },
		{ red: 40, green: 32, blue: 48, alpha: 255 },
		{ red: 53, green: 35, blue: 24, alpha: 255 },
		{ red: 65, green: 43, blue: 30, alpha: 255 },
		{ red: 76, green: 50, blue: 35, alpha: 255 },
		{ red: 40, green: 26, blue: 18, alpha: 255 },
		{ red: 53, green: 57, blue: 29, alpha: 255 },
		{ red: 65, green: 70, blue: 36, alpha: 255 },
		{ red: 76, green: 82, blue: 42, alpha: 255 },
		{ red: 40, green: 43, blue: 22, alpha: 255 }
	]

	colorId -= 3 // 

	if(!colors[colorId]) return { red:255, green: 255, blue: 255, alpha: 255 }
	else return colors[colorId];

}


function sendMsgVanish(nam){
	let channel = client.channels.cache.get(info_channel)
	if (!channel) return;

	const exampleEmbed = new MessageEmbed()
	.setColor("FFF700")
	.setTitle("STAFF ALERT")
	.setDescription(`<@&1030808938146430976>, Хелпер ${nam} зашел в ваниш!`)
	.setThumbnail("https://minotar.net/helm/" + nam + "/100.png")
	channel.send(exampleEmbed);	
}

function sendMsgNotVanish(nam){
	let channel = client.channels.cache.get(info_channel)
	if (!channel) return;

	const exampleEmbed = new MessageEmbed()
	.setColor("FFF700")
	.setTitle("STAFF ALERT")
	.setDescription(`<@&1030808938146430976>, Хелпер ${nam} вышел с сервера!`)
	.setThumbnail("https://minotar.net/helm/" + nam + "/100.png")
	channel.send(exampleEmbed);	
}

function sendStats(){
	let channel = client.channels.cache.get(info_channel)
	if (!channel) return;

	console.log("https://minotar.net/helm/" + statsName + "/100.png")

	const exampleEmbed = new MessageEmbed()
	.setColor("FFF700")
	.setTitle("Статистика игрока " + statsName)
	.setDescription(statsOnline)
	.addFields(
		{ name: 'Донат', value: statsDonate, inline: false },
		{ name: 'Клан', value: statsClan, inline: false },
		{ name: 'Наиграно', value: statsPT, inline: false },
		{ name: 'Убийств', value: statsKills, inline: false },
		{ name: 'Смертей', value: statsDeaths, inline: false },
		{ name: 'У/C', value: statsKD, inline: false },
		{ name: 'Деньги', value: statsMoney, inline: false },
		{ name: 'Discord', value: statsDiscord, inline: false },
	)
	.setThumbnail("https://minotar.net/helm/" + statsName + "/100.png")
	channel.send(exampleEmbed);	
}
function sendStatsFail(){	
	let channel = client.channels.cache.get(info_channel)
	if (!channel) return;
	channel.send("Такого игрока нет!")
}

function seenSend(t,channel){
	t = Date.now() - t;
    var cd = 24 * 60 * 60 * 1000,
        ch = 60 * 60 * 1000,
        d = Math.floor(t / cd),
        h = Math.floor( (t - d * cd) / ch),
        m = Math.round( (t - d * cd - h * ch) / 60000),
        pad = function(n){ return n < 10 ? '0' + n : n; };
  if( m === 60 ){
    h++;
    m = 0;
  }
  if( h === 24 ){
    d++;
    h = 0;
  }
  channel.send(`Видел этого игрока ${d} дней  ${h} часов  ${m} минут назад`)
  return [d, pad(h), pad(m)].join(':');
}

client.login("КЛЮЧ БОТА")
