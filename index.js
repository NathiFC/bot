const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');

const client = new Client({
  authStrategy: new LocalAuth(),
  puppeteer: {
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  }
});

client.on('qr', qr => {
  console.log('📱 Escaneie o QR Code abaixo para conectar:');
  qrcode.generate(qr, { small: true });
});

client.on('ready', () => {
  console.log('✅ Bot conectado com sucesso!');
});

client.on('message', message => {
  const texto = message.body.toLowerCase();

  if (texto === 'oi' || texto === 'olá' || texto === 'ola') {
    message.reply(
      `🌸 Olá, tudo bem?
Seja bem-vindo à Kalanchoe Flores!

Para solicitar um orçamento, por favor informe:

📅 Data do evento (dia, mês e ano)
📍 Local do evento
💐 Tipo de decoração:
- Cerimônia religiosa
- Buquê de noiva
- Arranjos em geral

Atenciosamente,
Kalanchoe Flores 💐`
    );
  }
});

client.initialize();
