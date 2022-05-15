let brojFO = 1;
let atributi = new Array();
let lhsFO = new Array();
let rhsFO = new Array();
let izvornaLhsFO = new Array();
let izvornaRhsFO = new Array();
let brojKandidata = 0;
let brojNF = 0;
let kljuceviKandidati = new Array();
let in3NF, inBoyceCodd;

const bazaPrimjera = {
	primjer1: {
		R: "A B C D E F G H I J",
		FO: [{ lhs: "A", rhs: "B C D" },
		{ lhs: "D", rhs: "E F I" },
		{ lhs: "I", rhs: "G H" },
		{ lhs: "H", rhs: "J" },
		{ lhs: "J", rhs: "B D F" },
		{ lhs: "B", rhs: "E H" },
		{ lhs: "C", rhs: "I" }]
	},

	primjer2: {
		R: "A B C D E F G H I J",
		FO: [{ lhs: "A", rhs: "B D" },
		{ lhs: "E", rhs: "G H" },
		{ lhs: "B", rhs: "J" },
		{ lhs: "J", rhs: "A" },
		{ lhs: "D", rhs: "B E" },
		{ lhs: "B G", rhs: "H" },
		{ lhs: "E J", rhs: "G" }]
	},

	primjer3: {
		R: "A B C D E F G H I J",
		FO: [{ lhs: "A", rhs: "D" },
		{ lhs: "A G", rhs: "B" },
		{ lhs: "B", rhs: "G" },
		{ lhs: "B", rhs: "E" },
		{ lhs: "E", rhs: "F" },
		{ lhs: "E", rhs: "B" },
		{ lhs: "H", rhs: "I J" },
		{ lhs: "D", rhs: "E J" },
		{ lhs: "F", rhs: "H I" }]
	},
	primjer4: {
		R: "A B C D E F G H I J",
		FO: [{ lhs: "A", rhs: "I" },
		{ lhs: "B", rhs: "G" },
		{ lhs: "G", rhs: "E H" },
		{ lhs: "C", rhs: "D H" },
		{ lhs: "E", rhs: "B" },
		{ lhs: "I", rhs: "J G" },
		{ lhs: "H", rhs: "C" },
		{ lhs: "A I", rhs: "G" },
		{ lhs: "I", rhs: "A" }]
	},

	primjer5: {
		R: "A B C D E F G H I J",
		FO: [{ lhs: "D", rhs: "C" },
		{ lhs: "A B", rhs: "F" },
		{ lhs: "A F", rhs: "G H" },
		{ lhs: "G H", rhs: "E" },
		{ lhs: "E", rhs: "A I" },
		{ lhs: "I", rhs: "B C D" },
		{ lhs: "H", rhs: "A C E G I" },]
	},
	primjer6: {
		R: "A B C D",
		FO: [{ lhs: "A", rhs: "B C D" },
		{ lhs: "B C", rhs: "A D" },
		{ lhs: "D", rhs: "B" },]
	},
	primjer7: {
		R: "A B C D",
		FO: [{ lhs: "A", rhs: "B C D" },
		{ lhs: "B C", rhs: "A D" },
		{ lhs: "D", rhs: "B A C" },]
	},
}

function valjanostUnosa(arr) {
	for (let i = 0; i < arr.length; i++) {
		let j = 0;
		for (j = 0; j < atributi.length; j++) {
			if (atributi[j] == arr[i])
				break;
		}
		if (j == atributi.length) {
			alert("Nevaljani unos : " + arr[i]);
			return false;
		}
	}
	return true;
}



function resetiraj() {
	atributi, lhsFO, rhsFO, izvornaLhsFO, izvornaRhsFO, kljuceviKandidati = new Array();;
	document.getElementById('unos-atributa').value = "";
	for (let i = 1; i < brojFO; i++)
		brisiFO(i);
	brojFO = 1;
	unosFO();
}





function ucitajPrimjer(key) {
	resetiraj();
	const primjer = bazaPrimjera[key];

	document.getElementById('unos-atributa').value = primjer.R

	primjer.FO.forEach((fo, i) => {
		document.getElementById(`lhs${i + 1}`).value = fo.lhs;
		document.getElementById(`rhs${i + 1}`).value = fo.rhs
		if (i < (primjer.FO.length - 1))
			unosFO();
	})

}

let isAlpha = function (ch) {
	return /^[A-Z]$/i.test(ch);
}
function regEx() {
	atributi = new Array();
	lhsFO = new Array();
	rhsFO = new Array();

	let string = document.getElementById('unos-atributa').value;
	let i = 0;
	while (i < string.length) {
		let j = i;
		let temp = "";
		while (isAlpha(string[j]) && j < string.length) {
			temp += string[j];
			j++;
		}
		atributi.push(temp);
		while (!isAlpha(string[j]) && j < string.length)
			j++;
		i = j;
	}
	// Lijeva strana
	for (let k = 1; k < brojFO; k++) {
		if (document.getElementById("lhs" + k) == null)
			continue;
		let arr = new Array();
		i = 0;
		let string = document.getElementById("lhs" + k).value;
		while (i < string.length) {
			let j = i;
			let temp = "";
			while (isAlpha(string[j]) && j < string.length) {
				temp += string[j];
				j++;
			}
			arr.push(temp);
			while (!isAlpha(string[j]) && j < string.length)
				j++;
			i = j;
		}
		arr.sort();
		lhsFO.push(arr);
	}

	// Desna strana
	for (let k = 1; k < brojFO; k++) {
		if (document.getElementById("lhs" + k) == null)
			continue;
		let arr = new Array();
		i = 0;
		let string = document.getElementById("rhs" + k).value;
		while (i < string.length) {
			let j = i;
			let temp = "";
			while (isAlpha(string[j]) && j < string.length) {
				temp += string[j];
				j++;
			}
			arr.push(temp);
			while (!isAlpha(string[j]) && j < string.length)
				j++;
			i = j;
		}
		arr.sort();
		rhsFO.push(arr);
	}

	for (let i = 0, j = 0; i < lhsFO.length && j < rhsFO.length; i++, j++) {
		izvornaLhsFO[i] = lhsFO[i].slice();
		izvornaRhsFO[i] = rhsFO[i].slice();

	}

}

function unosFO() {
	let novaFO = "<span id = \"FO" + brojFO + "\">";
	novaFO += "<input type=\"text\" placeholder=\"Lijeva strana ovisnosti\"id=\"lhs" + brojFO + "\"><input type=\"text\" placeholder=\"Desna strana ovisnosti\" id=\"rhs" + brojFO + "\">";
	novaFO += "</span>"
	let ct = document.createElement("div");
	ct.innerHTML = novaFO;
	document.getElementById('unos-forma').appendChild(ct);
	brojFO++;
}

function brisiFO(num) {
	document.getElementById("FO" + num).remove();
}



function getCanonCover() {
	// Punimo nizove atributi[], lhsFO[] i rhsFO[] s inicijalnim vrijednostima
	regEx();


	//Provjera za redundantnim FO i brisanje takvih 
	for (let i = 0; i < rhsFO.length; i++) {
		for (let j = 0; j < rhsFO[i].length; j++) {
			//provjera pojedinacnih atributa u rhsFO[i][j]
			for (let k = 0; k < lhsFO[i].length; k++) {
				if (lhsFO[i][k] == rhsFO[i][j]) {
					rhsFO[i].splice(j, 1);
					j--;
					break;
				}
			}
		}
	}



	//Minimizacija LHS za svaku FO
	//Provjeravamo svaki atribut u lhsFO; ako je prisutan u rhsFO i njemu podudarajucem lhsFO.....

	for (let i = 0; i < lhsFO.length; i++) {
		for (let j = 0; j < lhsFO[i].length; j++) {
			//Provjera za lhsFO[i][j]
			for (let k = 0; k < rhsFO.length; k++) {
				if (lhsFO[k].length == lhsFO[i].length - 1) {
					let l;
					for (l = 0; l < rhsFO[k].length; l++) {
						if (lhsFO[i][j] == rhsFO[k][l])
							break;
					}
					if (l != rhsFO[k].length) {
						//Projeravamo pojavljuju li se atributi lhsFO[i] u lhsFO[k]
						let sum = 0;
						for (let m = 0; m < lhsFO[i].length; m++) {
							for (let n = 0; n < lhsFO[k].length; n++) {
								if (lhsFO[i][m] == lhsFO[k][n])
									sum++;
							}
						}
						if (sum == lhsFO[i].length - 1) {
							lhsFO[i].splice(j, 1);
							j--;
							break;
						}
					}
				}
			}
		}
	}


	//Minimizacija LHS. Ako su za neke atribute u RHS, dva u LHS(l1 i l2), brišemo l1 ako je podkup l2

	for (let i = 0; i < rhsFO.length; i++) {
		for (let j = 0; j < rhsFO[i].length; j++) {
			//Provjeravamo da li se rhsFO[i][j] ponavljaju
			let flag = true;
			for (let k = i + 1; k < rhsFO.length && flag; k++) {
				for (let l = 0; l < rhsFO[k].length; l++) {
					if (rhsFO[i][j] == rhsFO[k][l]) {
						//Ako je lhs[k] podskup lhs[i] brišemo rhs[i][j]  i obratno
						let sum = 0;
						for (let m = 0; m < lhsFO[i].length; m++) {
							for (let n = 0; n < lhsFO[k].length; n++) {
								if (lhsFO[i][m] == lhsFO[k][n])
									sum++;
							}
						}

						if (sum == lhsFO[k].length) {
							//brisanje lhsFO[i][j]
							rhsFO[i].splice(j, 1);
							flag = false;
							break;
						}
						else if (sum == lhsFO[i].length) {
							//brisanje lhsFO[k][l]
							rhsFO[k].splice(l, 1);
							break;
						}
					}
				}
			}
			if (flag == false)
				j--;
		}
	}


	//Za svaki atribut u LHS, provjeravamo je li prisutan u ogradi drugih atributa; ako je brisemo ga
	for (let i = 0; i < lhsFO.length; i++) {
		for (let j = 0; j < lhsFO[i].length; j++) {
			let temp_arr = lhsFO[i].slice();
			let att = lhsFO[i][j];
			temp_arr.splice(j, 1);
			let ograda = pronadiOgradu(temp_arr, lhsFO, rhsFO);
			for (let k = 0; k < ograda.length; k++) {
				if (ograda[k] == att) {
					lhsFO[i].splice(j, 1);
					j--;
					break;
				}
			}
		}
	}



	//Brisemo ponavljajuce unose,tj., ako su dvije FO identicne , brisemo jednu
	for (let i = 0; i < lhsFO.length; i++) {
		for (let j = i + 1; j < lhsFO.length; j++) {
			//ako su pojedini atributi u lhs[i] == lhs[j] i u rhs[i] == rhs[j]
			let flag = true; //brisemo  lhsFO[j]


			if (lhsFO[i].length != lhsFO[j].length)
				flag = false;
			for (let m = 0; m < lhsFO[i].length && m < lhsFO[j].length; m++) {
				if (lhsFO[i][m] != lhsFO[j][m])
					flag = false;
			}
			if (rhsFO[i].length != rhsFO[j].length)
				flag = false;
			for (let m = 0; m < rhsFO[i].length && m < rhsFO[j].length; m++) {
				if (rhsFO[i][m] != rhsFO[j][m])
					flag = false;
			}
			if (flag) {
				lhsFO.splice(j, 1);
				rhsFO.splice(j, 1);
				j--;
			}
		}
	}

	//Brisanje redundantnih FO 
	//Provjera da li ograda cijele LHS ostaje ista nakon brisanja FO, ako je; brišemo je

	for (let i = 0; i < lhsFO.length; i++) {
		for (let m = 0; m < rhsFO[i].length; m++) {
			let temp_fd_lhs = [];
			let temp_fd_rhs = [];
			for (let j = 0; j < lhsFO.length; j++)
				temp_fd_lhs[j] = lhsFO[j].slice();
			for (let j = 0; j < rhsFO.length; j++)
				temp_fd_rhs[j] = rhsFO[j].slice();
			temp_fd_rhs[i].splice(m, 1);
			// ako se ograda lhsFO[i] sastoji od rhsFO[i],  brisemo lhsFO[i]
			let ograda = pronadiOgradu(lhsFO[i], temp_fd_lhs, temp_fd_rhs);

			let j;
			for (j = 0; j < rhsFO[i].length; j++) {
				let k;
				for (k = 0; k < ograda.length; k++) {
					if (ograda[k] == rhsFO[i][j])
						break;
				}
				if (k == ograda.length)
					break;
			}
			if (j == rhsFO[i].length) {
				rhsFO[i].splice(m, 1);
				m--;
			}
		}
	}

}

function pronadiOgradu(lhs, temp_fd_lhs, temp_fd_rhs) {
	let ograda = lhs.slice();
	let new_rhs_coming = true;
	while (new_rhs_coming) {
		new_rhs_coming = false;
		for (let i = 0; i < temp_fd_lhs.length; i++) {
			let lhs_in_closure = true;
			for (let j = 0; j < temp_fd_lhs[i].length; j++) {
				let lhs_ij_in_closure = false;
				for (let k = 0; k < ograda.length; k++) {
					if (ograda[k] == temp_fd_lhs[i][j]) {
						lhs_ij_in_closure = true;
						break;
					}
				}
				if (lhs_ij_in_closure == false) {
					lhs_in_closure = false;
					break;
				}
			}
			if (lhs_in_closure) {
				for (let j = 0; j < temp_fd_rhs[i].length; j++) {
					//ako rhsFO[i][j]  nije u ogradi, dodajemo ga u ogradu i oznacavamo new_rhs_coming kao 'true'
					let rhs_ij_in_closure = false;
					for (let k = 0; k < ograda.length; k++) {
						if (ograda[k] == temp_fd_rhs[i][j]) {
							rhs_ij_in_closure = true;
							break;
						}
					}
					if (rhs_ij_in_closure == false) {
						new_rhs_coming = true;
						ograda.push(temp_fd_rhs[i][j]);
					}
				}
			}
		}
	}
	ograda.sort();
	return ograda;
}

function printCanonCover() {
	let field = "<fieldset>";
	field += "<ul style=\"list-style-type:none\">";
	for (let i = 0; i < lhsFO.length; i++) {
		for (let j = 0; j < rhsFO[i].length; j++) {
			field += "<li>"
			for (let k = 0; k < lhsFO[i].length; k++)
				field += lhsFO[i][k] + " ";
			field += "  ->  " + rhsFO[i][j];
			field += "</li>";
		}
	}
	field += "</label>";
	field += "</fieldset><br>";
	document.getElementById("Fmin-field").innerHTML = field;
}

function pronadiKandidate() {
	//Reset kljuceviKandidati[]
	kljuceviKandidati = new Array();


	let not_on_rhs = new Array();	
	//moguciKljucevi =  relacija- oni koji nisu na desnoj strani 
	let moguciKljucevi = new Array();	
	let closure_not_on_rhs = new Array();	

	for (let i = 0; i < atributi.length; i++) {
		let in_rhs = false;
		for (let j = 0; j < rhsFO.length && in_rhs == false; j++) {
			for (let k = 0; k < rhsFO[j].length && in_rhs == false; k++) // Trazimo atribute koji se ne nalazi na desnoj strani 
			{

				if (rhsFO[j][k] == atributi[i])
					in_rhs = true;
			}
		}
		if (in_rhs == false)
			not_on_rhs.push(atributi[i]);
	}



	moguciKljucevi = atributi.slice();
	// Uklanjamo atribute iz funkcije (gdje spremamo kljuceve) koji su prisutni u funkciji ograda(koji nisu na desnoj strani)
	for (let i = 0; i < moguciKljucevi.length; i++) {
		let j;
		for (j = 0; j < closure_not_on_rhs.length; j++) {
			if (closure_not_on_rhs[j] == moguciKljucevi[i]) // Ako se nalazi samo na livoj strani (koji nisu na desnoj)
				break;
		}
		if (j != closure_not_on_rhs.length) {
			moguciKljucevi.splice(i, 1);
			i--;
		}
	}
	// Uklanjamo atribute iz funkcije (gdje spremamo kandidate kljuceva) koji su prisutni u desnoj a nisu na lijevoj strani
	for (let i = 0; i < moguciKljucevi.length; i++) {
		let in_lhs = false;
		let in_rhs = false;
		for (let j = 0; j < lhsFO.length && in_lhs == false; j++) {
			for (let k = 0; k < lhsFO[j].length && in_lhs == false; k++) {
				if (lhsFO[j][k] == moguciKljucevi[i])
					in_lhs = true;
			}
		}
		for (let j = 0; j < rhsFO.length && in_rhs == false; j++) {
			for (let k = 0; k < rhsFO[j].length && in_rhs == false; k++) {
				if (rhsFO[j][k] == moguciKljucevi[i])
					in_rhs = true;
			}
		}
		if (in_rhs == true && in_lhs == false) {
			moguciKljucevi.splice(i, 1);
			i--;
		}
	}

	let ograda = pronadiOgradu(not_on_rhs, lhsFO, rhsFO);
	if (ograda.length == atributi.length)		//koji nisu na desnoj strani 
		kljuceviKandidati.push(not_on_rhs);
	else 		//uzimamo kandidate kljuceva iz funkcije koji nisu na desnoj strani i funkciju potencijalni spremljeni kljucevi
		trazenjeKljuceveKandidata(moguciKljucevi, not_on_rhs, not_on_rhs);

	//Imamo sve kljuce za kandidate te sortiramo i brisemo prazne (kljuceve kandidate)
	for (let i = 0; i < kljuceviKandidati.length; i++) {
		if (kljuceviKandidati[i].length == 0) {
			kljuceviKandidati.splice(i, 1);
			i--;
			continue;
		}
		kljuceviKandidati[i].sort();
	}
	//Brisemo duplikate kandidiranih kljuceva (kljuceviKandidati[])
	for (let i = 0; i < kljuceviKandidati.length; i++) {
		for (let j = i + 1; j < kljuceviKandidati.length; j++) {
			let k = 0;
			for (k = 0; k < kljuceviKandidati[i].length && k < kljuceviKandidati[j].length; k++) {
				if (kljuceviKandidati[i][k] != kljuceviKandidati[j][k])
					break;
			}
			if (kljuceviKandidati[i].length == kljuceviKandidati[j].length && k == kljuceviKandidati[i].length) {
				kljuceviKandidati.splice(j, 1);
				j--;
			}
		}
	}
}
//Trazanje kandidata za kljuc 
function trazenjeKljuceveKandidata(moguciKljucevi, key, not_on_rhs) {
	for (let i = 0; i < moguciKljucevi.length; i++) {
		let tempKljucevi = key.slice();
		tempKljucevi.push(moguciKljucevi[i]);
		let ograda = pronadiOgradu(tempKljucevi, lhsFO, rhsFO);
		if (ograda.length == atributi.length)	//provjera je li kljuc postaje super kljuc
		{

			let isCandidate = true;
			//provjera je li kljuc kandidat za kljuc
			for (let j = 0; j < tempKljucevi.length; j++) {
				let inNotRHS = false;
				for (let k = 0; k < not_on_rhs.length && inNotRHS == false; k++) {
					if (not_on_rhs[k] == tempKljucevi[j])
						inNotRHS = true;
				}
				if (inNotRHS == false && tempKljucevi[j] != moguciKljucevi[i]) {
					let temp_arr = tempKljucevi.slice();
					temp_arr.splice(j, 1);
					let temp = pronadiOgradu(temp_arr, lhsFO, rhsFO);
					if (temp.length == atributi.length) {
						isCandidate = false;
						break;
					}
				}
			}
			if (isCandidate) {
				kljuceviKandidati.push(tempKljucevi);
			}
		}
		else {
			let noviKljucevi = moguciKljucevi.slice();
			noviKljucevi.splice(i, 1);
			trazenjeKljuceveKandidata(noviKljucevi, tempKljucevi, not_on_rhs);
		}
	}
}

function provjeriKljuceve() {
	if (brojKandidata % 2 == 0) {
		getCanonCover();
		for (let i = 0; i < lhsFO.length; i++) {
			if (valjanostUnosa(lhsFO[i].slice()) == false)
				return;
			if (valjanostUnosa(rhsFO[i].slice()) == false)
				return;
		}
		pronadiKandidate();
		ispisiKljuceveKandidate();
	}
	else {
		document.getElementById("KandidatiField").innerHTML = "";
	}
	brojKandidata++;
}

function ispisiKljuceveKandidate() {
	let field = "<fieldset>";
	field += "Ključevi:";
	for (let i = 0; i < kljuceviKandidati.length; i++) {
		field += "<li>"
		for (let j = 0; j < kljuceviKandidati[i].length; j++)
			field += kljuceviKandidati[i][j] + " ";
		field += "</li>";
	}

	document.getElementById("KandidatiField").innerHTML = field;
}



function pronadiNormalnuFormu() {
	in3NF = inBoyceCodd = true;
	getCanonCover();
	pronadiKandidate();

	//Provjera za 3NF
	//za svaku funkcijsku ovisnost lijeva strana je nadkljuc ili desna strana treba biti kljucni atribut
	for (let i = 0; i < izvornaLhsFO.length; i++) {
		let lijevaStranaNadkljuc = false;
		//provjera je li lijeva strana nadkljuc : za svaki potencijalni kljuc provjeravamo je li podskup od (izvornaLhsFO[i])
		for (let j = 0; j < kljuceviKandidati.length; j++) {
			if (kljuceviKandidati[j].length > izvornaLhsFO[i].length)
				continue;

			let sum = 0;
			for (let k = 0; k < kljuceviKandidati[j].length; k++) {
				for (let l = 0; l < izvornaLhsFO[i].length; l++) {
					if (izvornaLhsFO[i][l] == kljuceviKandidati[j][k]) {
						sum++;
						break;
					}
				}
			}
			if (sum == kljuceviKandidati[j].length) {
				lijevaStranaNadkljuc = true;
				break;
			}
		}
		// ako je lijeva strana super kljuc, onda postoji sansa da je u 3NF
		if (lijevaStranaNadkljuc)
			continue;

		//Provjeravamo jesu li svi atributi na desnoj strani(izvornaRhsFO[i]) osnovni atributi(kljucni atributi)
		let rhsOsnovniAtributi = true;
		for (let j = 0; j < izvornaRhsFO[i].length; j++) {
			let k;
			for (k = 0; k < kljuceviKandidati.length; k++) {
				let l;
				for (l = 0; l < kljuceviKandidati[k].length; l++) {
					if (kljuceviKandidati[k][l] == izvornaRhsFO[i][j])
						break;
				}
				if (l != kljuceviKandidati[k].length)
					break;
			}
			if (k == kljuceviKandidati.length) {
				rhsOsnovniAtributi = false;
				break;
			}
		}
		//Ako lijeva strana nije nadkljuc i neki atributi na desnoj strani nisu osnovni atributi te ako postoji tranz ovisnost onda tablica nije u 3 NF
		if (rhsOsnovniAtributi == false) {
			in3NF = false;
			break;
		}
	}
	if (in3NF == false) {
		inBoyceCodd = false;
		return;
	}

	//Provjera za BCNF
	//U BCNF je samo ako je  u svako FO lijeva strana nadkljuc 
	for (let i = 0; i < izvornaLhsFO.length; i++) {
		let lijevaStranaNadkljuc = false;
		// Za svaki kljuc kandidat, provjeri je li podskup izvorne lijeve strane FO (nepromjenjene FO) 
		for (let j = 0; j < kljuceviKandidati.length; j++) {
			if (kljuceviKandidati[j].length > izvornaLhsFO[i].length)
				continue;

			let sum = 0;
			for (let k = 0; k < kljuceviKandidati[j].length; k++) {
				for (let l = 0; l < izvornaLhsFO[i].length; l++) {
					if (izvornaLhsFO[i][l] == kljuceviKandidati[j][k]) {
						sum++;
						break;
					}
				}
			}
			if (sum == kljuceviKandidati[j].length) {
				lijevaStranaNadkljuc = true;
				break;
			}
		}
		if (lijevaStranaNadkljuc == false) {
			inBoyceCodd = false;
			break;
		}
	}

}

function provjeriNormalnuFormu() {
	if (brojNF % 2 == 0) {
		pronadiNormalnuFormu();
		for (let i = 0; i < lhsFO.length; i++) {
			if (valjanostUnosa(lhsFO[i].slice()) == false)
				return;
			if (valjanostUnosa(rhsFO[i].slice()) == false)
				return;
		} ispisiNormalnuFormu();
	}
	else {
		document.getElementById("check_normal_form_field").innerHTML = "";
	}
	brojNF++;
}


function ispisiNormalnuFormu() {
	let field = "<fieldset>";
	field += "<div id = \"NormalFormField" + "\">";

	(in3NF) ? field += "Nalazi se u 3 NF" : field += "Ne nalazi se u 3 NF";
	field += "<br>";

	(inBoyceCodd) ? field += "Nalazi se u BCNF" : field += "Ne nalazi se u BCNF";

	field += "</fieldset><br>";
	field += "</div>"
	document.getElementById("check_normal_form_field").innerHTML = field;
}
