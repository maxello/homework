(function(){
    var $list = $('aside ul');

    function addActive(elem){
        $list.find('li').removeClass('active');
        $(elem).addClass('active');
    }

    $list.on('click', 'li', function(){
        var that = this;
        addActive(that);
        if($('section h2').text() !== $(that).text()){
            $.getJSON('js/data.json', function(data){
                var output = '';
                $.each(data, function(key, val){
                    if(val.title === $(that).text()){
                        output += '<h2>' + val.title + '</h2>';
                        if(val.body){
                            output += '<article>' + val.body + '</article>';
                        }
                        if(val.source){
                            output += '<div><a href="' + val.source + '">Show</a></div>';
                        }
                    }
                });
                $('section').html(output);
            });
        }
    });
}());