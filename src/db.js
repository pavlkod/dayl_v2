module.exports = {
  getVacations: async (options = {}) => {
    const vacations = [
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
    ];
    if (options.available !== undefined) return vacations.filter(({ available }) => available === options.available);
    return vacations;
  },
};
