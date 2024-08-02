import fs from "fs";
export function loadData (path){
        try {
            const data = fs.readFileSync(path, 'utf8');
          return  JSON.parse(data);
        } catch (err) {
            console.error("Failed to parse data file:", err);
        }
    }


export function saveData (path,data){
    try{
        fs.writeFileSync(path, JSON.stringify(data, null, 2));
    }catch (err){
        console.error("Error Writing to db.json :", err);
    }
}