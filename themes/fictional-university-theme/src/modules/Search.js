import $ from 'jquery';
class Search{
    constructor(){
        // this.openButton = document.querySelector('.js-search-trigger');
        // this.closeButton = document.querySelector('.search-overlay__close');
        // this.searchOverlay = document.querySelector('.search-overlay');
        this.searchHTML();
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
                
                this.typingTimer = setTimeout(this.getResults.bind(this), 750)
            } else {
                this.searchResults.html('');
                this.isLoading = false;
            }
            
        }
        
        this.prevValue = this.searchField.val();
    }
    getResults(){
        $.when(
            $.getJSON(universityData.root_url + '/wp-json/wp/v2/posts?search=' + this.searchField.val()), 
            $.getJSON(universityData.root_url + '/wp-json/wp/v2/pages?search=' + this.searchField.val())
            ).then((posts,pages) => {
                const combinedResult = posts[0].concat(pages[0]);
                this.searchResults.html(`
                <h2 class="search-overlay__section-title">General Information</h2>
                ${ combinedResult.length ? '<ul class="link-list min-list">' : '<p>No result found.</p>' }
                    ${combinedResult.map(post => `<li><a href="${post.link}">${post.title.rendered}</a> ${post.type == 'post' ? 'by '+ post.authorName : ''} </li>`
                    ).join('')}
                    
                ${ combinedResult.length ? '</ul>' : ''}
            `);
            this.isLoading = false;
            }, ()=>{
                this.searchResults.html('<p>Unexpected error please try again!!</p>');
            });
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
        this.searchField.val('');
        setTimeout(() => this.searchField.focus(), 301)
        this.isOverlayOpen = true;
    }

    closeOverlay(){
        this.searchOverlay.removeClass('search-overlay--active');
        $('body').removeClass('body-no-scroll');
        this.isOverlayOpen = false;
    }

    searchHTML(){
        $('body').append(`
        <div class="search-overlay">
            <div class="search-overlay__top">
                <div class="container">
                <i class="fa fa-search search-overlay__icon" aria-hidden="true"></i>
                <input type="text" class="search-term" placeholder="What are you looking for" id="search-term">
                <i class="fa fa-window-close search-overlay__close" aria-hidden="true"></i>
                </div>
            </div>
            <div class="container">
                <div id="search-overlay__results"></div>
            </div>
        </div>
        `)
    }
}

export default Search;