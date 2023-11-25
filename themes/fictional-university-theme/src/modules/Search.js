import $ from 'jquery';
class Search{
    constructor(){
        // this.openButton = document.querySelector('.js-search-trigger');
        // this.closeButton = document.querySelector('.search-overlay__close');
        // this.searchOverlay = document.querySelector('.search-overlay');
        this.searchResults = $('#search-overlay__results');
        this.openButton = $('.js-search-trigger');
        this.closeButton = $('.search-overlay__close');
        this.searchOverlay = $('.search-overlay');
        this.searchField = $('#search-term');
        this.events();
        this.isOverlayOpen = false;
        this.isLoading = false;
        this.prevValue;
        this.typingTimer;
    }

    //events

    events(){
        // this.openButton.addEventListener('click', this.openOverlay.bind());
        // this.closeButton.addEventListener('click', this.closeOverlay.bind());
        this.openButton.on('click', this.openOverlay.bind(this));
        this.closeButton.on('click', this.closeOverlay.bind(this));
        $(document).on("keydown", this.keyPressDispatcher.bind(this));
        this.searchField.on("keyup", this.typingLogic.bind(this));
    }

    // Methods
    typingLogic(){
        if(this.searchField.val() != this.prevValue){
            clearTimeout(this.typingTimer);
            if(this.searchField.val()){
                if(!this.isLoading){
                    this.searchResults.html('<div class="spinner-loader"></div>');
                    this.isLoading = true;
                }
                
                this.typingTimer = setTimeout(this.getResults.bind(this), 2000)
            } else {
                this.searchResults.html('');
                this.isLoading = false;
            }
            
        }
        
        this.prevValue = this.searchField.val();
    }
    getResults(){
        this.searchResults.html('result will show here....');
        this.isLoading = false;
    }
    keyPressDispatcher(e){
        if(e.keyCode == 83 && !this.isOverlayOpen && !$(input, texarea).is(':focus')){
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