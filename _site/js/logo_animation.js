/* magic animation written by a ukranian SVG guru. can't untangle this spagetti, but it seems to work! */

$(function(){
  var interval, intervalo;
  var stopAnim = function(){
    clearInterval(interval);
    clearInterval(intervalo);
    /*переменные начального состояния*/
    ra=1, aa=-9.5, ri=10, le=-10, rigt=-5, left=5, up=0,lup=-2,head=0,he=0,ruun=false;
  };
  var ruun = false;
  /*
   * функція alltime() постоянно махания крыльями 
   */
  var alltime =function allt(){
    if(ruun){return;};
    ruun = true;
    /*переменные начального состояния*/

    var ra=1, aa=-9.5, ri=20, le=-20, rigt=5, left=5, up=0,lup=-2,head=0,he=0, end=1;
    /*меняя параметр функции сет интервал можно изменять скорость анимации*/
    if(!wio()){interval = setInterval(wio, 30);};

    function wio(){if(ra>=51){ra=1;};
      if(ra<20){aa=aa+.5;} else if(ra>=20 && ra<=38){aa=aa-.5;};
      if(ra>=28 && ra<38){rigt=rigt-9;left=left-9;} else if(ra>=40 && ra<50){rigt=rigt+9;left=left+9;};
      if(ra>=1 && ra<25){ri=ri+6; le=le-6;up=up-.5;lup=lup+.7;he=he-.5;head=head+.7;} else if(ra>=26 && ra<50){ri=ri-6; le=le+6;up=up+.5;lup=lup-.7;he=he+.5;head=head-.7;};

      document.getElementById("osno").getAttributeNode("d").value= "M305,102.1s"+aa+"-16,-4.8-28.43L300.5,72.37L261.17,72L267,78.58l10.56-1.82-10.35,2.35v5.66l7.74,2.31,7.62-4.24-7.27,4.75v4.19l4.11,2.68,8.31-4-8,4.5v2.42l1.69,2.29,8-2.71-7.88,3.23v3l0.46,1.62,6.63-.72z";
      document.getElementById("osno1").getAttributeNode("d").value="M300,107.1s"+aa+"-16,-4.8-26.43L295.5,77.37L256.17,77L262,83.58l10.56-1.82-10.35,2.35v5.66l7.74,2.31,7.62-4.24-7.27,4.75v4.19l4.11,2.68,8.31-4-8,4.5v2.42l1.69,2.29,8-2.71-7.88,3.23v3l0.46,1.62,6.63-.72z";
      ra++;
      $("#right").css("transform","rotate3d(1,.05,0,"+ri+"deg)"); /*меняет кут поворота крыла правого*/
      $("#left").css("transform","rotate3d(1,.05,-.2,"+le+"deg)translateY("+lup+"px)"); /*меняет кут поворота крыла и немножко поднимает левое крыло*/
      $("#part_fly").css("transform","rotate3d(1,0,0,"+rigt+"deg)");/*меняет кут поворота второй части правого крыла*/
      $("#part_fly1").css("transform","rotate3d(1,0,0,"+left+"deg)"); /*меняет кут поворота второй части левого крыла */
      $("#head_byrd").css("transform","rotate3d(0,1,.3,"+head+"deg)translateY("+he+"px)");/*меняет кут поворота головы и немножко поднимает голову*/
      $("#body_byrd").css("transform","translateY("+up+"px)");/*немножко поднимает туловище*/


      /**myStopFunction() останавливает анимацыю
      */  
    };  };

  /*
   * функція onetime() 1 маха крыльями на 6 сек
   */

  var onetime = function onet(){
    if(ruun){return;};
    ruun = true;
    /*переменные начального состояния*/
    var rao=1, aao=-4.5, rio=10, leo=-10, rigto=-5, lefto=5, upo=0,lupo=-2,heado=0,heo=0, endo=1,ww=0;
    /* меняя параметр функции сет интервал можно изменять скорость анимации*/
    intervalo = setInterval(wioo, 36);
    function wioo(){
      /* rao>=251 изменяя число в этом сравнении можно увеличивать или уменьшать время задержки перед очередным ударом крыльями*/
      if(rao>=151){rao=1;};
      if(rao>=10 && rao<20){aao=aao+.5;} else if(rao>=20 && rao<=38){aao=aao-.5;}else if(rao>=39 && rao<48){aao=aao+.5;};
      if(rao>=28 && rao<38){rigto=rigto+8;lefto=lefto-8;} else if(rao>=40 && rao<50){rigto=rigto-8;lefto=lefto+8;};
      if(rao>=2 && rao<25){rio=rio+6; leo=leo-6;upo=upo-.5;lupo=lupo+.8;heo=heo-.5;heado=heado+.7;} else if(rao>=26 && rao<49){rio=rio-6; leo=leo+6;upo=upo+.5;lupo=lupo-.8;heo=heo+.5;heado=heado-.7;};


      document.getElementById("osno").getAttributeNode("d").value= "M305,102.1s"+aao+"-16,-4.8-28.43L300.5,72.37L261.17,72L267,78.58l10.56-1.82-10.35,2.35v5.66l7.74,2.31,7.62-4.24-7.27,4.75v4.19l4.11,2.68,8.31-4-8,4.5v2.42l1.69,2.29,8-2.71-7.88,3.23v3l0.46,1.62,6.63-.72z";
      document.getElementById("osno1").getAttributeNode("d").value="M300,107.1s"+aao+"-16,-4.8-26.43L295.5,77.37L256.17,77L262,83.58l10.56-1.82-10.35,2.35v5.66l7.74,2.31,7.62-4.24-7.27,4.75v4.19l4.11,2.68,8.31-4-8,4.5v2.42l1.69,2.29,8-2.71-7.88,3.23v3l0.46,1.62,6.63-.72z";
      rao++;
      $("#right").css("transform","rotate3d(1,.05,0,"+rio+"deg)");  /*меняет кут поворота крыла правого*/
      $("#left").css("transform","rotate3d(1,.05,-.2,"+leo+"deg)translateY("+lupo+"px)"); /*меняет кут поворота крыла и немножко поднимает левое крыло*/
      $("#part_fly").css("transform","rotate3d(-1,0,0,"+rigto+"deg)"); /*меняет кут поворота второй части правого крыла*/
      $("#part_fly1").css("transform","rotate3d(-1,0,0,"+lefto+"deg)");/*меняет кут поворота второй части левого крыла */
      $("#head_byrd").css("transform","rotate3d(0,1,.3,"+heado+"deg)translateY("+heo+"px)");/*меняет кут поворота головы и немножко поднимает голову*/
      $("#body_byrd").css("transform","translateY("+upo+"px)");/*немножко поднимает туловище*/

    }; 
  };

  $("#alltime").click(function(){alltime();});
  $("#onetime").click(function(){onetime();});
  window.storkAnimation = {
    once: onetime,
    alltime: alltime,
    stop: stopAnim
  };
});
