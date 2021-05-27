<template>
    
    <!-- <meta charset="utf-8">
    <title>Timetable</title>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="icon" type="image/x-icon" href="favicon.ico">
    <link type="text/css" rel="stylesheet" href="assets/main.css">
    <link type="text/css" rel="stylesheet" href="assets/overview.css"> -->

<!-- <div class="header">
    <div class="header__left">
        <img src="assets/logo.png" alt="Логотип" class="header__logo header__item">
        <a class="header__btn header__item" href="timetable.html">Назад</a>
        <div class="header__btn header__item">Избранное</div>
        <p class="header__data">31.01.2021</p>
    </div>


</div> -->

<div class="main main-overview">
    <div class="timetable-list">
        <div>
            <ol class="timetable">
                <p class="group">4ПКС-17-2К <img onclick=setFavorites(this) src="assets/star.svg" id="4ПКС-17-2К"></p>
                <li class="lesson">
                    <p class="lesson__number">1</p>
                    <div class="lesson-inner">
                        <div class="lesson__header">
                            <p class="lesson__name">Математика</p>
                        </div>
                        <div class="lesson__extra">
                            <p class="lesson__teacher">
                              <span>
                                <ion-icon name="person"></ion-icon>
                                <span>Виклянчук Е.А.</span>
                              </span>
                            </p>
                            <p class="lesson__room">
          <span>
            <ion-icon name="location-sharp"></ion-icon>
            <span>204</span>
          </span>
                            </p>
                        </div>
                    </div>
                </li>

                <li class="lesson">
                    <div class="lesson__numbers">

                        <p class="lesson__number">2</p>
                    </div>
                    <div class="lesson-inner">
                        <div class="lesson__header">
                            <p class="lesson__name">Иностранный язык</p>
                            <p class="lesson__group__note">1 подгруппа</p>
                        </div>


                        <div class="lesson__extra">

                            <p class="lesson__teacher">
          <span>
            <ion-icon name="person"></ion-icon>
            <span>Орехова К.Б.</span>
          </span>
                            </p>
                            <p class="lesson__room">
          <span>
            <ion-icon name="location-sharp"></ion-icon>
            <span>302</span>
          </span>
                            </p>
                        </div>

                        <div class="lesson__header">
                            <p class="lesson__name">Иностранный язык</p>
                            <p class="lesson__group__note">2 подгруппа</p>
                        </div>


                        <div class="lesson__extra">
                            <p class="lesson__teacher">
          <span>
            <ion-icon name="person"></ion-icon>
            <span> Деревянкина С.Н.</span>
          </span>
                            </p>
                            <p class="lesson__room">
          <span>
            <ion-icon name="location-sharp"></ion-icon>
            <span>304</span>
          </span>
                            </p>
                        </div>
                    </div>


                </li>
                <li class="lesson">
                    <div class="lesson__numbers">

                        <p class="lesson__number">3</p>
                    </div>
                    <div class="lesson-inner">
                        <div class="lesson__header">
                            <p class="lesson__name">Иностранный язык</p>
                            <p class="lesson__group__note">1 подгруппа</p>
                        </div>


                        <div class="lesson__extra">

                            <p class="lesson__teacher">
          <span>
            <ion-icon name="person"></ion-icon>
            <span>Орехова К.Б.</span>
          </span>
                            </p>
                            <p class="lesson__room">
          <span>
            <ion-icon name="location-sharp"></ion-icon>
            <span>302</span>
          </span>
                            </p>
                        </div>


                        <div class="lesson__header">
                            <p class="lesson__name">Иностранный язык</p>
                            <p class="lesson__group__note">2 подгруппа</p>
                        </div>


                        <div class="lesson__extra">
                            <p class="lesson__teacher">
          <span>
            <img class="person-img" src="../assets/person-overview.svg">
            <span>Деревянкина С.Н.</span>
          </span>
                            </p>
                            <p class="lesson__room">
          <span>
            <img class="location-sharp-img" src="../assets/location-sharp-overview.svg">
            <span>304</span>
          </span>
                            </p>
                        </div>
                    </div>


                </li>
            </ol>
        </div>
    </div>
</div>



</template>

<script>
 
export default {
  name: "Overview",
  mounted(){
    // let ionScript = document.createElement('script')
    // ionScript.setAttribute('src', 'https://unpkg.com/ionicons@5.4.0/dist/ionicons.js')
    // document.head.appendChild(ionScript)
    // new Promise((resolve) => {
    //   let script = document.createElement('script')
    //   script.onload = () => {
    //     resolve(import(someComponent))
    //   }
    //   script.async = true
    //   script.src = 'https://unpkg.com/ionicons@5.4.0/dist/ionicons.js'
    //   document.head.appendChild(script)
    // }
  }
}
</script>

<style>
/* // src="assets/overview.js"
// <script src="https://unpkg.com/ionicons@5.4.0/dist/ionicons.js"></script> */
@import "../assets/Overview.module.css";
</style>