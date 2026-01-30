function csvToJson(csv) {
  const lines = csv.trim().split("\n");
  const headers = lines[0].split(",");

  return lines.slice(1).map(line => {
    const values = line.split(",");
    return headers.reduce((obj, header, index) => {
      obj[header.trim()] = values[index].trim();
      return obj;
    }, {});
  });
}

// Uso
const csv = `nombre,edad,pais
Juan,25,Peru
Ana,30,Chile`;

const json = csvToJson(csv);
console.log(json);