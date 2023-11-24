import $ from 'jquery';
class Search{
    constructor(){
        // this.openButton = document.querySelector('.js-search-trigger');
        // this.closeButton = document.querySelector('.search-overlay__close');
        // this.searchOverlay = document.querySelector('.search-overlay');
        this.openButton = $('.js-search-trigger');
        this.closeButton = $('.search-overlay__close');
        this.searchOverlay = $('.search-overlay');
        this.events();
        this.isOverlayOpen = false;
    }

    //events

    events(){
        // this.openButton.addEventListener('click', this.openOverlay.bind());
        // this.closeButton.addEventListener('click', this.closeOverlay.bind());
        this.openButton.on('click', this.openOverlay.bind(this));
        this.closeButton.on('click', this.closeOverlay.bind(this));
        $(document).on("keydown", this.keyPressDispatcher.bind(this));
    }
    keyPressDispatcher(e){
        if(e.keyCode == 83 && !this.isOverlayOpen){
            this.openOverlay();
        }
        if(e.keyCode == 27 && this.isOverlayOpen){
            this.closeOverlay();
        }
    }
    openOverlay(){
        //console.log('open');
        this.searchOverlay.addClass('search-overlay--active');
        $('body').addClass('body-no-scroll');
        this.isOverlayOpen = true;
    }

    closeOverlay(){
        this.searchOverlay.removeClass('search-overlay--active');
        $('body').removeClass('body-no-scroll');
        this.isOverlayOpen = false;
    }
}

export default Search;