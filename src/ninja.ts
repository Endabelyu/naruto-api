interface Family {
  id: string;
  name: string;
}

interface Ninja {
  id: string;
  name: string;
  village: string;
  family: Family[];
}

export const initialNinja: Ninja[] = [
  {
    id: '1',
    name: 'Naruto Uzumaki',
    village: 'Konohagakure',
    family: [
      {
        id: '1',
        name: 'Minato Namikaze',
      },
      {
        id: '2',
        name: 'Kushina Uzumaki',
      },
    ],
  },
  {
    id: '2',
    name: 'Sasuke Uchiha',
    village: 'Konohagakure',
    family: [
      {
        id: '3',
        name: 'Fugaku Uchiha',
      },
      {
        id: '4',
        name: 'Mikoto Uchiha',
      },
    ],
  },
  {
    id: '3',
    name: 'Sakura Haruno',
    village: 'Konohagakure',
    family: [
      {
        id: '5',
        name: 'Kizashi Haruno',
      },
      {
        id: '6',
        name: 'Mebuki Haruno',
      },
    ],
  },
];

export function getDataNinja() {
  return initialNinja;
}

export function getDataNinjaById(id: string) {
  const filteredNinja = initialNinja.find((ninja) => ninja.id === id);
  return filteredNinja;
}

export function createDataNinja(newNinja: Ninja) {
  const checkNinja = initialNinja.find((current) =>
    current.name.toLowerCase().includes(newNinja.name),
  );
  if (checkNinja) {
    return {
      message: 'Data with the same name already exists and cannot be created.',
      code: 409,
    };
  }
  let newId;
  if (initialNinja.length === 0) {
    newId = '1';
  } else {
    newId = `${initialNinja.length + 1}`;
  }
  initialNinja.push({
    ...newNinja,
    id: newId!,
  });
  return { data: initialNinja, code: 200 };
}

export function deleteNinjaById(id: string) {
  const index = initialNinja.findIndex((ninja) => ninja.id === id);

  if (index === -1) {
    return { code: 404, message: 'No data ninja available' };
  }

  initialNinja.splice(index, 1);
  return {
    code: 200,
    message: 'Data ninja successfully deleted!',
    data: initialNinja,
  };
}

export function editDataNinja(id: string, updatedData: Partial<Ninja>) {
  const index = initialNinja.findIndex((ninja) => ninja.id === id);

  if (index === -1) {
    return { code: 404, message: 'No data ninja available' };
  }

  // Update the ninja data with the provided fields in updatedData
  initialNinja[index] = { ...initialNinja[index], ...updatedData };

  return {
    code: 200,
    message: 'Data Ninja has successfully edited',
    data: initialNinja,
  };
}
