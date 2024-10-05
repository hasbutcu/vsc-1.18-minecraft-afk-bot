const mineflayer = require("mineflayer");
const db = require("quick.db");

var ayar = {
  host: "whatcuclaimn.aternos.me", // Sunucu IP'sini giriniz.
  port: 42279, // Sunucu portunu giriniz.
  username: "Abolun", // Bot ismini girin.
  version: false, // Versiyonu otomatik algıla. Tüm versiyonlar için false bırakın.
};

var kayit = {
  authme: "yok", // Sunucunuzda login plugini | varsa > evet | yoksa > yok
  sifre: "ADMIN",
};

var automessage = true;
var ziplama = true; // Zıplama kontrol değişkeni

var bot = mineflayer.createBot(ayar);


// Giriş yapıldığında mesaj gönder
bot.on("login", () => {
  console.log("Bot giriş yaptı!");
  bot.chat("Merhaba! Ben buradayım!"); // Giriş yaptıktan sonra mesaj at
});

// Mesaj gönderme aralığı
if (automessage == true) {
  setInterval(() => {
    bot.chat("hello my bot");
  }, 300000); // 5 dakikada bir mesaj atar
}

// Her 30 saniyede bir zıplamasını kontrol etmek için
setInterval(() => {
  if (ziplama) { // Eğer ziplama true ise zıplar
    bot.setControlState("jump", true); // Zıplamayı başlat
    setTimeout(() => {
      bot.setControlState("jump", false); // Zıplamayı durdur
    }, 1000); // 1 saniye zıplasın (istediğin süreye göre ayarla)
  }
}, 30000); // 30 saniye aralıklarla

// Hata ve yeniden bağlanma olaylarını yönetin
bindEvents(bot);
function bindEvents(bot) {
  bot.on("error", function (err) {
    console.log("Bir hata oluştu: ", err);
  });

  bot.on("end", function () {
    console.log("Bot sunucudan atıldı!");
    setTimeout(relog, 5000); // 5 saniye sonra yeniden bağlanmaya çalış
  });

  // Yeniden bağlanma işlevi
  function relog() {
    console.log("Sunucuya Tekrardan Bağlanılıyor...");
    bot = mineflayer.createBot(ayar);



    bindEvents(bot);
  }
}
