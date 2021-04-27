function getRandomValue(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

const app = Vue.createApp({
  data() {
    return {
      playerHealth: 100,
      monsterHealth: 100,
      roundCount: 0,
      winner: null,
      logList: [],
    };
  },
  methods: {
    playerAttack() {
      this.roundCount++;
      const attackValue = getRandomValue(5, 15);
      this.monsterHealth -= attackValue;
      this.addLogToList("player", "attack", attackValue);
      this.monsterAttack();
    },
    monsterAttack() {
      const attackValue = getRandomValue(10, 20);
      this.playerHealth -= attackValue;
      this.addLogToList("monster", "attack", attackValue);
    },
    playerSpell() {
      this.roundCount++;
      const attackValue = getRandomValue(10, 30);
      this.monsterHealth -= attackValue;
      this.addLogToList("player", "attack", attackValue);
      this.monsterAttack();
    },
    playerHeal() {
      this.roundCount++;
      const healValue = getRandomValue(20, 40);

      if (this.playerHealth + healValue > 100) {
        this.playerHealth = 100;
      } else {
        this.playerHealth += healValue;
      }

      this.addLogToList("player", "heal", healValue);
      this.monsterAttack();
    },
    playerSurrender() {
      this.winner = "monster";
    },
    restartGame() {
      this.playerHealth = 100;
      this.monsterHealth = 100;
      this.roundCount = 0;
      this.winner = null;
      this.logList = [];
    },
    addLogToList(who, what, value) {
      this.logList.unshift({
        actionBy: who,
        actionType: what,
        actionValue: value,
      });
    },
  },
  computed: {
    monsterBarStyles() {
      if (this.monsterHealth < 0) {
        return { width: "0%" };
      }
      return { width: this.monsterHealth + "%" };
    },
    playerBarStyles() {
      if (this.playerHealth < 0) {
        return { width: "0%" };
      }
      return { width: this.playerHealth + "%" };
    },
    mayUseSkill() {
      return this.roundCount % 3 != 0;
    },
  },
  watch: {
    playerHealth(value) {
      if (value <= 0 && this.monsterHealth <= 0) {
        this.winner = "withdraw";
      } else if (value <= 0) {
        this.winner = "monster";
      }
    },
    monsterHealth(value) {
      if (value <= 0 && this.playerHealth <= 0) {
        this.winner = "withdraw";
      } else if (value <= 0) {
        this.winner = "player";
      }
    },
  },
});

app.mount("#game");
