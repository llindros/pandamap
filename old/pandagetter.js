function makePandaData(pandaList) {
    var listy = [];
    listy += 'data: [';
  
    for(items in pandaList.items) {
        data += "{";
        data += "x: "; data += pandaList[items].birth_year;
        data += "x2 "; data += pandaList[items].death_year;
        data += "y: "; data += "2";
        data += "}";
    }
  
  
    listy += ']';
    return listy;
  }

