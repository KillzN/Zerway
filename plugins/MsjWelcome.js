const handler = async (m, { conn, args }) => {
    // Verificar si se proporcionaron los argumentos necesarios
    if (args.length < 2) {
        conn.reply(m.chat, '𝘋𝘦𝘣𝘦𝘴 𝘱𝘳𝘰𝘱𝘰𝘳𝘤𝘪𝘰𝘯𝘢𝘳 𝘭𝘢 𝘩𝘰𝘳𝘢 (𝘏𝘏:𝘔𝘔) 𝘺 𝘦𝘭 𝘱𝘢𝘪́𝘴 (𝘔𝘟, 𝘊𝘖, 𝘊𝘓, 𝘈𝘙).', m);
        return;
    }

    // Validar el formato de la hora
    const horaRegex = /^([01]\d|2[0-3]):?([0-5]\d)$/;
    if (!horaRegex.test(args[0])) {
        conn.reply(m.chat, '𝘍𝘰𝘳𝘮𝘢𝘵𝘰 𝘥𝘦 𝘩𝘰𝘳𝘢 𝘪𝘯𝘤𝘰𝘳𝘳𝘦𝘤𝘵𝘰. 𝘋𝘦𝘣𝘦 𝘴𝘦𝘳 𝘏𝘏:𝘔𝘔 𝘦𝘯 𝘧𝘰𝘳𝘮𝘢𝘵𝘰 𝘥𝘦 24 𝘩𝘰𝘳𝘢𝘴.', m);
        return;
    }

    const horaUsuario = args[0]; // Hora proporcionada por el usuario
    const pais = args[1].toUpperCase(); // País proporcionado por el usuario

    // Definir la diferencia horaria de cada país con respecto a México
    const diferenciasHorarias = {
        MX: 0, // México tiene la misma hora
        CO: 1, // Colombia tiene una hora más
        CL: 2, // Chile tiene dos horas más
        AR: 2  // Argentina tiene tres horas más
    };

    if (!(pais in diferenciasHorarias)) {
        conn.reply(m.chat, 'País no válido. Usa MX para México, CO para Colombia, CL para Chile o AR para Argentina.', m);
        return;
    }

    // Obtener la diferencia horaria del país seleccionado
    const diferenciaHoraria = diferenciasHorarias[pais];

    // Calcular las cuatro horas consecutivas en cada país según la hora proporcionada y la diferencia horaria
    const hora = parseInt(horaUsuario.split(':')[0], 10);
    const minutos = parseInt(horaUsuario.split(':')[1], 10);

    const horasEnPais = [];
    for (let i = 0; i < 4; i++) {
        const horaActual = new Date();
        horaActual.setHours(hora + i);
        horaActual.setMinutes(minutos);
        horaActual.setSeconds(0);
        horaActual.setMilliseconds(0);

        const horaEnPais = new Date(horaActual.getTime() - (3600000 * diferenciaHoraria)); // Restar la diferencia horaria
        horasEnPais.push(horaEnPais);
    }

    // Formatear las horas según el formato de 24 horas y obtener solo la hora y minutos
    const formatTime = (date) => date.toLocaleTimeString('es', { hour12: false, hour: '2-digit', minute: '2-digit' });

    const horaActual = formatTime(new Date()); // Obtener la hora actual sin modificación

    const message = `*╔══════════════*\n*╟❧ @subject*\n*╠══════════════*\n*╟❧ @user*\n*╟❧ 𝙱𝙸𝙴𝙽𝚅𝙴𝙽𝙸𝙳𝙾/𝙰* \n*║*\n*╟❧ 𝙳𝙴𝚂𝙲𝚁𝙸𝙿𝙲𝙸𝙾𝙽 𝙳𝙴𝙻 𝙶𝚁𝚄𝙿𝙾:*\n\n@desc\n\n*║*\n*╟❧ 𝙳𝙸𝚂𝙵𝚁𝚄𝚃𝙰 𝚃𝚄 𝙴𝚂𝚃𝙰𝙳𝙸𝙰!!*\n*╚══════════════*`.trim();
    
    conn.sendMessage(m.chat, { text: message }, { quoted: m });
};
handler.help = ['Bienvenida']
handler.tags = ['Welcome']
handler.command = /^(Bienvenida|Bienvenido)$/i;
export default handler;
