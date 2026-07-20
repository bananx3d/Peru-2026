(() => {
  const amazon = window.PERU_AMAZON || { species: [] };
  window.PERU_WILDLIFE = {
    version: 1,
    species: amazon.species,
    locations: [
      'Curassow Lodge',
      'rzeka / główny nurt',
      'kanał lub starorzecze',
      'las terra firme',
      'las zalewowy',
      'brzeg rzeki',
      'nocne wyjście łodzią',
      'nocny trekking',
      'Iquitos / okolice',
      'inne'
    ],
    confidence: [
      {id:'confirmed', label:'Potwierdzone przez przewodnika'},
      {id:'probable', label:'Prawdopodobne'},
      {id:'unknown', label:'Do identyfikacji'}
    ],
    rules: [
      'Jedno spotkanie może obejmować kilka osobników — wpisz szacowaną liczbę, ale nie udawaj dokładności.',
      'Gatunek uznajemy za widziany po potwierdzeniu przez przewodnika albo po wystarczająco pewnym zdjęciu.',
      'Nie prowokujemy zwierząt playbackiem, jedzeniem ani podejściem pod gniazdo lub norę.',
      'Zdjęcie w trackerze jest małą, skompresowaną miniaturą. Oryginał pozostaje w galerii telefonu.',
      'Po każdym wyjściu wpisujemy obserwacje tego samego dnia — pamięć szybko miesza godziny i lokalizacje.'
    ]
  };
})();
