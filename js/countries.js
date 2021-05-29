/************27-05-2021*******************/
var nombreTemporal =""; //Nombre temporal del país tecleado
$( document ).ready(function() {
    //Busqueda al momento de presionar cada tecla en el campo de busqueda
    $( "#search" ).on('keyup', function() {
        var html="";
        var contadorPasadas=0;
        //Si los caracteres son mayores a 3 se genera una busqueda asincrona a la API https://restcountries.eu/
        if($('#search').val().length>3){
            $.ajax({
                url:"https://restcountries.eu/rest/v2/name/"+$('#search').val(),
                type:"get",
                success:function(data){
                    //Escribimos las sugerencias que nos manda la consulta                   
                    for(i in data){
                        contadorPasadas++;
                        html+= '<div><a class="suggest-element" datoParaBusqueda="'+data[i].name+'" data="'+data[i].name+' '+data[i].altSpellings+'" id="product'+contadorPasadas+'">'+data[i].name+' '+data[i].altSpellings+'</a></div>';
                    }                    
                    $('#suggestions').fadeIn(1000).html(html);
                    
                    //Al hacer click en alguna de las opciones sugeridas
                    $('.suggest-element').on('click', function(){

                            //Obtenemos el id unica de la sugerencia seleccionada
                            var id = $(this).attr('id');

                            //Editamos el valor del input con data de la sugerencia clickeada
                            $('#key').val($('#'+id).attr('data'));

                            //Hacemos desaparecer el resto de sugerencias
                            $('#suggestions').fadeOut(1000);
                            $('#search').val($('#'+id).attr('data'));
                            $('#search').attr('datoParaBusqueda', $('#'+id).attr('datoParaBusqueda'));
                    });      
                }
            });
        }else{
            //Si los caracteres escritos en el input son menores a 4 entonces se limpia la lista de opciones de paises sugeridos
            $('#suggestions').empty();
        }  
    });

    //Al salir del campo de texto mediante la perdida del focus se limpia el input de busqueda y se guarda la cadena escrita para
    //poder consultarlo en la modalidad cadena libre
    $( "#search" ).blur(function() {
        nombreTemporal = $('#search').val();
        $('#search').val('');
    });

    //Cuando se presiona el boton de busqueda entra aquí
    $('#botonBusqueda').click(function(){
        $('#search').val('');
        $('#resultados').empty();
        //Si se selecionó una de las opciones de la lista desplegable entra aquí
        if($('#search').attr('datoParaBusqueda')!=''){
            $.ajax({
                url:"https://restcountries.eu/rest/v2/name/"+$('#search').attr('datoParaBusqueda')+"?fields=name;region;currencies;language;population;flag",
                type:"get",
                success:function(data){
                    //Se presentaran hasta 4 banderas por fila en la modalidad mas amplia de pantallas
                    html="<div class='row col-lg-12'>";
                    for(i in data){
                        html+='<div class="col-lg-3 col-md-4 col-sm-6 col-xs-12 card" style="height:250px">';
                            html+='<div class="card-body">';
                                html+='<span><center><img src='+data[i].flag+' width="100px"></center></span>';
                                html+='<p class="card-title">Name:<i>'+data[i].name+'</i></p>';
                                html+='<p class="card-text">Region:<i>'+data[i].region+'</i></p>';
                                for(z in data[i].currencies){
                                    html+='<p class="card-text">Currency:<i>'+data[i].currencies[z].name+'</i></p>';
                                } 
                                for(z in data[i].language){
                                    html+='<p class="card-text">Language:<i>'+data[i].language[z].name+'</i></p>';
                                }
                                html+='<p class="card-text">Population:<i>'+data[i].population.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")+'</p>';
                            html+='</div>';
                        html+='</div>';
                    }
                    html+='</div>';
                    //Se adicionan los resultados en el div para mostralos
                    $('#resultados').append(html);
                }
            });
            $('#search').attr('datoParaBusqueda', '');
        }else{ //Si se envío una cadena libre para su busqueda si seleccionar ninguna opción de la lista desplegable entra aquí
            $('#suggestions').fadeOut(1000);
            $.ajax({
                url:"https://restcountries.eu/rest/v2/name/"+nombreTemporal+"?fields=name;region;currencies;language;population;flag",
                type:"get",
                success:function(data){
                    //Se presentaran hasta 4 banderas por fila en la modalidad mas amplia de pantallas
                    html="<div class='row col-lg-12'>";
                    for(i in data){
                        html+='<div class="col-lg-3 col-md-4 col-sm-6 col-xs-12 card" style="height:250px">';
                            html+='<div class="card-body">';
                                html+='<span><center><img src='+data[i].flag+' width="100px"></center></span>';
                                html+='<p class="card-title">Name:<i>'+data[i].name+'</i></p>';
                                html+='<p class="card-text">Region:<i>'+data[i].region+'</i></p>';
                                for(z in data[i].currencies){
                                    html+='<p class="card-text">Currency:<i>'+data[i].currencies[z].name+'</i></p>';
                                } 
                                for(z in data[i].language){
                                    html+='<p class="card-text">Language:<i>'+data[i].language[z].name+'</i></p>';
                                }
                                html+='<p class="card-text">Population:<i>'+data[i].population.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")+'</p>';
                            html+='</div>';
                        html+='</div>';
                    }
                    html+='</div>';     
                    //Se adicionan los resultados en el div para mostralos               
                    $('#resultados').append(html);
                }
            });
        }
    });
});