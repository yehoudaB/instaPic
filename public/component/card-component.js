export default class CardComponent extends HTMLElement{
    constructor(){
        super();
        this._root = this.attachShadow({mode:'open'})
    }

    
    connectedCallback(){
        
        let post = this.post
        let tagsFormated='';
        let tags = ''
        tags = post.tags.split(',')
        
        tags.forEach(tag => {
            tag = `<span class="tag">#${tag}</span>`
            tagsFormated+= tag
        });
        this._root.innerHTML = `<style>
                                    @import "./component/card-component.css" 
                                </style>
                                <div class="card" id="post${post.id}">
                                    <img src="img/${post.img}" alt="image" >
                                    <div class="imgDescription">
                                        <h3 class="title">${post.title}</h3>
                                        <div class="likeBtn" >&#10084;</div>
                                    </div>   
                                    <div class="tags" >
                                        ${tagsFormated}
                                    </div>
                                </div>`
                            
        const likeBtn = this._root.querySelector('.likeBtn');
        likeBtn.addEventListener('click',this.likeAnImage);
        
    }

    likeAnImage(){    
        if(this.style.color ==="red"){
            this.style.color ="grey"
            this.dispatchEvent(
                new CustomEvent('disliked'), {
                    detail: { liked: this.post},
            });
        } else{
            this.style.color ="red"
            this.dispatchEvent(
                new CustomEvent('liked'), {
                    detail: { liked: this.post },
            });
        }


                
        
    }
}