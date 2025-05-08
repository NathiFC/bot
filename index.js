const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');
const chromium = require('chrome-aws-lambda');

const client = new Client({
  authStrategy: new LocalAuth(),
  puppeteer: {
    executablePath: async () => await chromium.executablePath,
    args: chromium.args,
    headless: chromium.headless
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
      `🌸 Olá, tudo bem?\nSeja bem-vindo à Kalanchoe Flores!\n\nPara solicitar um orçamento, por favor informe:\n\n📅 Data do evento (dia, mês e ano)\n📍 Local do evento\n💐 Tipo de decoração:\n- Cerimônia religiosa\n- Buquê de noiva\n- Arranjos em geral\n\nAtenciosamente,\nKalanchoe Flores 💐`
    );
  }
});

client.initialize();
