class Item{
    constructor(itemData){
        this.data = itemData;
    }

    create(){
        let item = document.createElement('li');
        item.classList.add("brands__item", "item");
        item.innerHTML = `
            <input type="checkbox" class="item__check">
            <img src="${this.data.photo}" alt="" class="item__img">
            <h4 class="item__name">${this.data.name}</h4>
        `;
        this.data.published ? item.innerHTML += `<div class="brands__published">published</div>` : item.innerHTML += `<div class="brands__published brands__published--not"> not published</div>`
        item.innerHTML += '<div class="item__settings">...</div>' 
        
        return item.outerHTML;
    }
}

class App {
    constructor(){
        this.listData = [
            {photo:".././asssets/img/icon1.png", name:"Avocado Roll", published: true},
            {photo:".././asssets/img/standard-icon.png", name:"Lobster Roll Combo", published: false},
            {photo:".././asssets/img/icon2.png", name:"Vegetable Salad", published: true},
            {photo:".././asssets/img/standard-icon.png", name:"Orange Fresh", published: true},
            {photo:".././asssets/img/standard-icon.png", name:"Lobster Roll Combo", published: true},
            {photo:".././asssets/img/icon3.png", name:"Lobster Roll Combo", published: false},
            {photo:".././asssets/img/icon1.png", name:"Avocado Roll 2", published: true},
            {photo:".././asssets/img/standard-icon.png", name:"Lobster Roll Combo 2", published: false},
            {photo:".././asssets/img/icon2.png", name:"Vegetable Salad 2", published: true},
            {photo:".././asssets/img/standard-icon.png", name:"Orange Fresh 2", published: true},
            {photo:".././asssets/img/standard-icon.png", name:"Lobster Roll Combo 2", published: true},
            {photo:".././asssets/img/icon3.png", name:"Lobster Roll Combo 2", published: false},
            {photo:".././asssets/img/icon1.png", name:"Avocado Roll 3", published: true},
            {photo:".././asssets/img/standard-icon.png", name:"Lobster Roll Combo 3", published: false},
            {photo:".././asssets/img/icon2.png", name:"Vegetable Salad 3", published: true},
            {photo:".././asssets/img/standard-icon.png", name:"Orange Fresh 3", published: true},
            {photo:".././asssets/img/standard-icon.png", name:"Lobster Roll Combo 3", published: true},
            {photo:".././asssets/img/icon3.png", name:"Lobster Roll Combo 3", published: false},
            {photo:".././asssets/img/icon3.png", name:"Lobster Roll Combo 3", published: false},
        ];
        this.listDiv = document.querySelector('.brands__list');
        this.itemOnPage =  6;
        this.pageNum = 1;

        this.listOnPage;
        this.init()
    }
    init(){
        this.create();
        this.showFooterInfo();
        this.pagination();
        document.querySelector('.brands__create_btn').addEventListener("click", () => this.add());
        document.querySelector('.search__input').addEventListener("input", (event) => this.search(event));
    }
    create(){
        this.listOnPage = this.listData.slice((this.pageNum - 1) * this.itemOnPage, ((this.pageNum - 1) * this.itemOnPage) + this.itemOnPage);
        this.listDiv.innerHTML = "";
        this.listOnPage.forEach((item) => this.listDiv.innerHTML += `${new Item(item).create()}`);
    }

    add(){
        const submitForm = (addWrap) =>  {
            document.querySelector(".add_form__btn_add").addEventListener("click", () =>{
                let imgUrl = document.querySelector('.add_form__img_input').value || ".././asssets/img/standard-icon.png";
                let name = document.querySelector('.add_form__name_input').value;
                let published = document.querySelector('.add_form__published_input').checked ? "published" : "not published";

                if(!name) return;

                addWrap.classList.add('add_form--disabled');
                addWrap.innerHTML = "";

                let newItem =  {photo:imgUrl, name: name, published: published};
                this.listData.unshift(newItem);
                this.create();
            });
        }
        const closeForm = (addWrap) => {
            document.querySelector(".add_form__btn_close").addEventListener("click", (event) =>{
                event.preventDefault();
                addWrap.classList.add('add_form--disabled');
                addWrap.innerHTML = "";
            });
        }

        const create = function () {
            let addWrap = document.querySelector(".add_form");
            addWrap.classList.remove("add_form--disabled");
            addWrap.innerHTML = `
                <form class="add_form__wrapper">
                    <div class="add_form__img">
                        Img address<br/>
                        <input type="url"  class="add_form__img_input">
                    </div>
                    <div class="add_form__name">
                        Name <br/>
                        <input type="text" class="add_form__name_input">
                    </div>
                    <div class="add_form__published">
                        Published
                        <input type="checkbox" class="add_form__published_input">
                    </div>

                    <div class="add__form_btns">
                        <button class="add_form__btn_add" type="button">Add</button>
                        <button class="add_form__btn_close" type="button">Close</button>
                    </div>
                </form>
            `;
            closeForm(addWrap);
            submitForm(addWrap);
        }(); 
    }

    search(event){
        if(!event.target.value){
            this.listDiv.innerHTML = "";
            this.listOnPage.forEach((item) => this.listDiv.innerHTML += `${new Item(item).create()}`);
            return;
        }

        let searchList = [];

        this.listData.forEach(item => {
            if(item.name.includes(event.target.value)) searchList.push(item);
        });

        this.listDiv.innerHTML = "";
        searchList.forEach((item) => this.listDiv.innerHTML += `${new Item(item).create()}`);
    }

    showFooterInfo(){
        let start = ((this.pageNum - 1) * this.itemOnPage)+ 1;
        let end = ((this.pageNum - 1) * this.itemOnPage) + this.itemOnPage;
        if (end > this.listData.length + 1)  end = this.listData.length ;
        document.querySelector(".brands__items_num").innerHTML = `${start} - ${end}`
        document.querySelector(".brands__items_all").innerHTML =  this.listData.length;
    }

    pagination(){
        const changePage = (event) =>  { 
            this.pageNum = event.target.innerHTML;
            this.showFooterInfo()
            this.create();
        }


        const create =  () => {
            let container = document.querySelector('.brands__pagination');
            let numberPages =  Math.ceil(this.listData.length / this.itemOnPage);
            
    
            for(let i = 1; i <= numberPages; i++){
                let num = document.createElement('li');
                num.classList.add("brands__pagination_num");
                num.innerHTML = `${i}`;
    
                num.addEventListener("click", (event) => changePage(event))
    
                container.append(num);
            }
        }
        create();
    }
}


const brand = new App();