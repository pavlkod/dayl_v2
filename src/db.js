const Vacation = require("./models/vacation");

module.exports = {
  getVacations: async (options = {}) => {
    /*const vacations = [
      {
        name: "Однодневный тур в Худ-Ривер",
        slug: "hood- river - day - trip",
        category: "Однодневный тур",
        sku: "HR199",
        description:
          "Проведите день в плавании по реке " +
          "Колумбия и насладитесь сваренным " +
          "по традиционным рецептам пивом в Худ-Ривер!",
        location: {
          search: "Худ-Ривер, Орегон, США",
          price: 99.95,
          tags: ["однодневный тур", "худ-ривер", "плавание", "виндсерфинг", "пивоварни"],
          inSeason: true,
          maximumGuests: 16,
          available: true,
          packagesSold: 0,
        },
      },
    ];*/
    const vacations = Vacation.find(options);
    if (options.available !== undefined) return vacations.filter(({ available }) => available === options.available);
    return vacations;
  },
  addVacationlnSeasonListener: async (email, sku) => {
    // Мы только притворимся, что делаем это...
    // Поскольку это асинхронная функция, автоматически
    // будет возвращен новый промис,
    // исполняющийся со значением undefined.
  },
};
