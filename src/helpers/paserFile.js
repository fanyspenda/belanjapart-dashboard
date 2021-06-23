export async function csvReader(file) {
  try {
    const result = await readFileAsync(file);
    return result;
  } catch (err) {
    console.log(err);
    return err;
  }
}

function readFileAsync(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = function(e) {
      const temp = reader.result.split('\n');
      const result = temp[0].split(',');
      const mainForm = result.splice(0, 7);

      resolve(result);
    };
    reader.onerror = reject;
    reader.readAsText(file);
  });
}
