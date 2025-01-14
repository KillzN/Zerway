

const handler = async (m, {isOwner, isAdmin, conn, text, participants, args, command, usedPrefix}) => {
  const datas = global
  const idioma = datas.db.data.users[m.sender].language
  const _translate = JSON.parse(fs.readFileSync(`./language/${idioma}.json`))
  const tradutor = _translate.plugins.gc_tagall

  if (usedPrefix == 'a' || usedPrefix == 'A') return;
  if (!(isAdmin || isOwner)) {
    global.dfail('admin', m, conn);
    throw false;
  }
  const pesan = args.join` `;
  const oi = `*𝙀𝙏𝙄𝙌𝙐𝙀𝙏𝘼𝙎:* ${pesan}`;
  let teks = `*𝙄𝙣 𝙖 𝙎𝙠𝙮 𝙁𝙪𝙡𝙡 𝙊𝙛 𝙎𝙩𝙖𝙧𝙨, 𝙔𝙤𝙪 𝘼𝙧𝙚 𝙏𝙝𝙚 𝙈𝙤𝙤𝙣🌙*\n\n ${oi}\n\n➥ _*@JoseFdorante:*_\n`;
  for (const mem of participants) {
    teks += `🍁 ⇝ @${mem.id.split('@')[0]}\n`;
  }
  teks += `*└𝙕𝙚𝙧𝙬𝙖𝙮𝘽𝙤𝙩`;
  conn.sendMessage(m.chat, {text: teks, mentions: participants.map((a) => a.id)} );
};
handler.help = ['tagall <mesaje>', 'invocar <mesaje>'];
handler.tags = ['group'];
handler.command = /^(tagall|invocar|invocacion|todos|invocación|putos)$/i;
handler.admin = true;
handler.group = true;
export default handler;
