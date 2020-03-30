//NATO censor
const swears = ['fuck', 'shit', 'cunt', 'asshole', 'nigga', 'motherfucker', 'slut', 'bitch', 'wtf', 'dick', 'pussy', 'suck'];
const nato_alp = ['**A**lfa', '**B**ravo', '**C**harlie', '**D**elta', '**E**cho', '**F**oxtrot', '**G**olf', '**H**otel', '**I**ndia', '**J**uliett', '**K**ilo', '**L**ima', '**M**ike',
'**N**ovember', '**O**scar', '**P**apa', '**Q**uebec', '**R**omeo','**S**ierra', '**T**ango', '**U**niform', '**V**ictor', '**W**hiskey', '**X**-ray', '**Y**ankee', '**Z**ulu'];

//Dad greeting
const wordfx = ['really', 'very', 'super', 'the', 'not', 'quite', 'absolutely', 'actually', 'so', 'going', 'to', 'at', 'in', 'on', 'only', 'your', 'his', 'her', 'our', 'my', 'their',
'too', 'still', 'always', 'also', 'seldom', 'ur', 'a', 'an', 'that', 'gonna'];

module.exports = {
    nato_censor: function (msg)
    {
        let args = msg.split(' ');
        let lowargs = msg.toLowerCase().split(' ');

        let respond = '';
        let senSwear = false;

        for (j = 0; j < lowargs.length; j++) {
            let isSwear = false;
            for (i = 0; i < swears.length; i++) {
                if (lowargs[j].includes(swears[i])) {
                    isSwear = true;
                    senSwear = true;
                    break;
                }
            }

            if (isSwear) {
                let charargs = lowargs[j].split('');
                for (i = 0; i < charargs.length; i++) {
                    if (charargs[i].charCodeAt(0) >= 97 && charargs[i].charCodeAt(0) <= 122) {
                        respond += nato_alp[charargs[i].charCodeAt(0) - 97] + ' ';
                    } else {
                        respond += charargs[i];
                    }
                }
            } else {
                respond += args[j] + ' ';
            }
        }

        if (senSwear) {
            return respond;
        } else {
            return 0;
        }
    },

    dad_greeting: function(msg)
    {
        let args = msg.split(/[\W]+/);
        let lowargs = msg.toLowerCase().split(/[\W]+/);

        let j = 0
        let i = -1;

        if (lowargs.indexOf('i') > -1) {
            i = lowargs.indexOf('i');
        }
        
        if (lowargs.indexOf('im') > -1) {
            j = lowargs.indexOf('im');
        }

        if (i > -1 && (lowargs[i + 1] === 'am' || lowargs[i + 1] === 'm') && lowargs[i + 2] != undefined) {
            return dad_subfunc(i, lowargs, args, 1);
        } else if (j > -1 && lowargs[j] === 'im' && lowargs[j + 1] != undefined) {
            return dad_subfunc(j, lowargs, args, 0);
        }


        return 0;
    }
}

function dad_subfunc(i, lowargs, args, sep)
{
    let m = 0;
    while (wordfx.includes(lowargs[i + 1 + sep + m])) {
        if (lowargs[i + + 1 + sep + m + 1] === undefined) break;
        m++;
    }
    let respond = args[i + 1 + sep];
    for (n = 1; n <= m; n++) {
        respond += ' ' + args[i + 1 + sep + n];
    }
    return respond;
}