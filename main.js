(function(doc) {
    const selectClass = (className) => doc.querySelector(className)
        cardsList = selectClass('.card-list'),
        cardsForm = selectClass('.card-form'),
        activeClass = selectClass('.active-modal'),
        warningModal = selectClass('.modal'),
        closeModal = selectClass('.close-modal'),
        clearAll = selectClass('.confirm-delete'),
        cards = JSON.parse(localStorage.getItem('cards')) || [];

    fillCardsList(cards);

    cardsForm.addEventListener('submit', function (e) {
        const title = selectClass('.input').value,
            description = selectClass('.textarea').value,
            card = {
                title: title,
                description: description
            };

        e.preventDefault();

        if (!title || description === '') return;

        cards.push(card);
        fillCardsList(cards);
        storeCards(cards);
        cardsForm.reset();
    });

    function fillCardsList(cards = []) {
        cardsList.innerHTML = cards.map((card, i) => {
            return `
                <article class="message is-dark data-id="${i}"">
                    <div class="message-header">
                        <p>${card.title}</p>
                        <button class="delete" aria-label="delete"></button>
                    </div>
                    <div class="message-body">
                        ${card.description}
                    </div>
                </article>
            `;
        }).join('');
    }

    function storeCards(cards = []) {
        localStorage.setItem('cards', JSON.stringify(cards));
    }

    cardsList.addEventListener('click', function (e) {
        const target = e.target,
            index = target.parentNode.parentNode.dataset.id;

        if (!target.matches('.delete')) return;

        cards.splice(index, 1);

        fillCardsList(cards);
        storeCards(cards);
    });

    function isActive(e) {
        warningModal.classList.toggle('is-active');

        e.preventDefault();
    }

    clearAll.addEventListener('click', function () {
        cards.splice(0, cards.length);

        fillCardsList(cards);
        storeCards(cards);

        warningModal.classList.remove('is-active');
    });

    activeClass.addEventListener('click', isActive);
    closeModal.addEventListener('click', isActive);
})(document);

$('.message a').click(function(){
    $('form').animate({height: "toggle", opacity: "toggle"}, "slow");
 });

 angular.module('starter', ['ionic'])

 .controller('ProfileCtrl', function($scope, ProfileSrvc) {
 
   $scope.user = ProfileSrvc.user_data;
 
   $scope.logIn = function() {
     ProfileSrvc.get_user_data();
   };
 
   $scope.logIn();
 })
 
 .factory('ProfileSrvc', function(UserService) {
   var userData = {
     name: '',
     info: '',
     icon: ''
   };
 
   function getUserData() {
     UserService.GetUsers(1).then(function(items) {
       console.log(items[0]);
       userData.name = items[0].name.first + ' ' + items[0].name.last;
       userData.info = items[0].location.street + ', ' + items[0].location.city;
       userData.icon = items[0].picture.medium;
     });
   };
 
   return {
     user_data: userData,
     get_user_data: getUserData
   }
 })
 
 .factory('UserService', function($http) {
   var BASE_URL = "https://api.randomuser.me/";
   var items = [];
 
   return {
     GetUsers: function(count) {
       return $http.get(BASE_URL + '?results=' + count).then(function(response) {
         console.log("GetUsers");
         items = response.data.results;
         return items;
       });
     }
   }

   const reasonInput = document.querySelector('#input-reason');
const amountInput = document.querySelector('#input-amount');
const cancelBtn = document.querySelector('#btn-cancel');
const confirmBtn = document.querySelector('#btn-confirm');
const expenseList = document.querySelector('#expense-list');
const totalExpensesOutput = document.querySelector('#total-expenses');
const alertCtrl = document.querySelector('ion-alert-controller');

let totalExpenses = 0;

const clear = () => {
  reasonInput.value = '';
  amountInput.value = '';
};

confirmBtn.addEventListener('click', () => {
  const enteredReason = reasonInput.value;
  const enteredAmount = amountInput.value;

  if (
    enteredReason.trim().length <= 0 ||
    enteredAmount <= 0 ||
    enteredAmount.trim().length <= 0
  ) {
    alertCtrl.create({
      message: 'Please enter valid reason & amount.',
      header: 'Invalid inputs',
      buttons: ['Okay']
    }).then(alertElement => {
      alertElement.present();
    });
    return;
  }
  const newItem = document.createElement('ion-item');
  newItem.textContent = enteredReason + ': $' +  enteredAmount;
  expenseList.appendChild(newItem);
});

cancelBtn.addEventListener('click', clear);


 });