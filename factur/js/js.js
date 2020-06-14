

document.querySelector('input').addEventListener('change', e => {
	document.querySelector('img').src = URL.createObjectURL(e.target.files[0]);
});


function myFunction() {
    var today = new Date();
var time = today.getSeconds()+today.getMinutes()  +today.getDay() + "/" + today.getMonth() + "/" + today.getFullYear();
    document.getElementById("demo").innerHTML ="Facture N°"+ "" + time;
  }
  $(document).ready(function () {
    myFunction()
    var i = 1;
    $("#add_row").click(function () {
        b = i - 1;
        $('#addr' + i).html($('#addr' + b).html()).find('td:first-child').html(i + 1);
        $('#tab_logic').append('<tr id="addr' + (i + 1) + '"></tr>');
        i++;
    });
    $("#delete_row").click(function () {
        if (i > 1) {
            $("#addr" + (i - 1)).html('');
            i--;
        }
        calc();
    });

    $('#tab_logic tbody').on('keyup change', function () {
        calc();
    });
    $('#tax').on('keyup change', function () {
        calc_total();
    });


});

function calc() {
    $('#tab_logic tbody tr').each(function (i, element) {
        var html = $(this).html();
        if (html != '') {
            var qty = Number($(this).find('.qty').val());
            var price = Number($(this).find('.price').val());
            var tax = Number($(this).find('.tax').val());
           
            $(this).find('.total').val(qty * price);

            calc_total();
        }
    });
}

function calc_total() {
    subTotal = 0;
    $('.total').each(function () {
        subTotal += parseInt($(this).val());
    });
    $('#sub_total').val(subTotal.toFixed(2));
    tax_sum = subTotal / 100 * $('#tax').val();
    $('#tax_amount').val(tax_sum.toFixed(2));
    $('#total_amount').val((subTotal+ tax_sum).toFixed(2));

   convert(event)
}
// === convert number === //
function convert(event) {
      event.preventDefault();
      var enny = document.getElementById('total_amount').value;
      // var virgule = Math.round(enny);
      document.getElementById('result').innerHTML = convertNumbersToWords(Math.round(enny))+ " " + "MAD";
      
  
    };
  
    function convertNumbersToWords(number) {
      var language = {
        units: ['', 'un', 'deux', 'trois', 'quatre', 'cinq', 'six', 'sept', 'huit', 'neuf', 'dix', 'onze', 'douze', 'treize', 'quatorze', 'quinze', 'seize', 'dix-sept', 'dix-huit', 'dix-neuf'],
        tens: ['', '', 'vingt', 'trente', 'quarante', 'cinquante', 'soixante', 'soixante-dix', 'quatre-vingts', 'quatre-vingt-dix'],
        scales: ['', 'mille', 'million', 'billion', 'trillion', 'quadrillion', 'quintillion', 'sextillion', 'septillion', 'octillion', 'nonillion', 'décillion', 'undécillion', 'duodécillion', 'tredécillion', 'quatttuordécillion', 'quindécillion', 'sexdécillion', 'septendécillion', 'octodécillion', 'novemdécillion', 'vigintillion', 'centillion'],
        negative: 'moins',
        zero: 'zero',
        hundred: 'cent',
        and: ''
      }
  
      var numberToString = number.toString().replace('-', '');
  
      var numberLength = numberToString.length;
  
      var sections = [];
  
      var words = [];
  
      var endPoint, integers, i;
  
      if (parseInt(number, 10) === 0) {
        return language.zero;
      }
  
      while (numberLength > 0) {
        endPoint = numberLength;
  
        sections.push(numberToString.slice((numberLength = Math.max(0, numberLength - 3)), endPoint));
      }
  
      for (i = 0; i < sections.length; i++) {
        integers = sections[i].split('').reverse().map(parseFloat);
  
        if (integers[1] === 1) {
          integers[0] += 10;
        }
  
        if (language.scales[i]) {
          words.push(language.scales[i]);
        }
  
        if (language.units[integers[0]]) {
          words.push(language.units[integers[0]]);
        }
  
        if (language.tens[integers[1]]) {
          words.push(language.tens[integers[1]]);
        }
  
        if (integers[0] || integers[1]) {
          if (integers[2] || (i === 0 && number > 100)) {
            words.push(language.and);
          }
        }
  
        if (language.units[integers[2]]) {
          words.push(language.units[integers[2]] + ' ' + language.hundred);
        }
      }
  
      if (number < 0) {
        words.push(language.negative);
      }
  
      return words.reverse().join(' ');
    };
 
  
  // function figure(val) {
  //   finalFig = convertNumbersToWords(val);
  //   document.getElementById("result").innerHTML = finalFig;
  // };
 
