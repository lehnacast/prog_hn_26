/* script pour le téléchager un fichier texte */
window.onload = function() {
    let fileInput = document.getElementById('fileInput');
    let fileDisplayArea = document.getElementById('fileDisplayArea');

   
    fileInput.addEventListener('change', function(e) {
      
        let file = fileInput.files[0];
        
        let textType = new RegExp("text.*");

        if (file.type.match(textType)) { 
            var reader = new FileReader();

           
            reader.onload = function(e) {
                fileDisplayArea.innerText = reader.result;
            }

           
            reader.readAsText(file);    

            document.getElementById("logger").innerHTML = '<span class="infolog">Fichier chargé avec succès</span>';
        } else { 
            fileDisplayArea.innerText = "";
            document.getElementById("logger").innerHTML = '<span class="errorlog">Type de fichier non supporté !</span>';
        }
    });
}

/*bouton pour la segmentation du texte*/
function segText() {

    if (document.getElementById('fileDisplayArea').innerText === "") { /* vérifier si un fichier a été téléchager */
        alert("Il faut d'abord charger un fichier .txt !");
    } else {

        if (document.getElementById("delimID").value === "") {
            document.getElementById("logger").innerHTML =
                '<span class="errorlog">Aucun délimiteur donné !</span>';
        } else {

            document.getElementById('logger').innerHTML = "";

            let text = document.getElementById("fileDisplayArea").innerText; /* récuparation du fichier texte*/
            let delim = document.getElementById("delimID").value;
            let display = document.getElementById("page-analysis");

            let regex_delim = new RegExp(
                "[" +
                delim
                    .replace("-", "\\-") /* évite les erreurs avec des tirets */
                    .replace("[", "\\[").replace("]", "\\]")
                + "\\s]+"
            );

            let tokens = text.split(regex_delim); /* découpe correctement les mots */
            tokens = tokens.filter(x => x.trim() !== ""); /* supprime les espaces vides */
			let lines = text.split(/\r?\n/g);
            lines = lines.filter(line => line.trim() !== "");

            global_var_tokens = tokens;
            global_var_lines = lines;

            display.innerHTML = tokens.join(" "); /* affichage du résultat apres la segmentation des mots */
        }
    }
}

/*bouton kujuj avec l'ajout de "uj" à la fin de mots */
function kujuj() {
	let motsFichiers = document
		.getElementById("fileDisplayArea")  /* récuparation du fichier texte*/
		.innerText
		.replace(/[.,!?;:()"'’]/g, "") /* j'enlève la ponctuation */
		.split(/\s+/);
		
	let motKujuj = "";

	for (let i = 0; i < motsFichiers.length ; i++) {
		motKujuj = motKujuj + motsFichiers[i]+"uj ".toString();
	}
	document.getElementById("page-analysis").innerHTML = motKujuj;
	console.log(motKujuj); /* afficvhage des mots avec la terminaison "uj" à la fin de chaque mot */
}


/*bouton pour determiner les mots les plus longs du texte*/
function motLesPlusLongs() {
    let mots = document
		.getElementById("fileDisplayArea")  /* récuparation du fichier texte*/
		.innerText
		.replace(/[.,!?;:()"'’]/g, " ") /* j'enlève la ponctuation pour avoir les vrais mots les plus longs*/
		.split(/\s+/);

    mots.sort((a, b) => b.length - a.length);

    let result = mots.slice(0, 10); /* top 10 des mots les plus longs */

    document.getElementById("page-analysis").innerHTML = result.join(" "); /* affichage du top 10 du mot le plus long au moins long */
}

/*bouton pour déterminer le nombre de phrases dans le texte */
function nbPhrases() {
    let text = document.getElementById("fileDisplayArea").innerText; /* récuparation du fichier texte*/

   let phrases = text.split(/[.!?]+/); /* découpage grâce à la ponctuation et aux espaces */
   phrases = phrases.filter(p => p.trim() !=="");
   document.getElementById("page-analysis").innerHTML =
		"Nombre de phrases : " + phrases.length; /* affichage du nombre de phrases déterminer */
}
		
		