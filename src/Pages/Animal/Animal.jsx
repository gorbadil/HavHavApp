function Animal() {
  const headName = "animal";
  const head = [
    {
      dataBaseName: "name",
      siteName: "Hayvan Adı",
      field: "text",
    },
    {
      dataBaseName: "species",
      siteName: "Hayvan Türü",
      field: "text",
    },
    {
      dataBaseName: "breed",
      siteName: "Hayvan Irkı",
      field: "text",
    },
    {
      dataBaseName: "gender",
      siteName: "Hayvan Cinsiyeti",
      field: "text",
    },
    {
      dataBaseName: "dateOfBirth",
      siteName: "Hayvan Doğum Tarihi",
      field: "date",
    },
    {
      dataBaseName: "colour",
      siteName: "Hayvan Rengi",
      field: "text",
    },
    {
      dataBaseName: "customer.id",
      siteName: "",
      field: "select",
    },
  ];

  return <div>Animal</div>;
}

export default Animal;
