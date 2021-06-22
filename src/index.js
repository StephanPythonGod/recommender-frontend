import React from 'react';
import ReactDOM from 'react-dom';
import './style.css';

import Modal from 'react-modal';

Modal.setAppElement('#root');


function Product(props){

    if (props.in_basket) {
        return (
            <div class="col-md-6 col-lg-4 mb-5" onClick={() => props.onClick(props.product)} key={props.product}>
                <div class="portfolio-item mx-auto" data-bs-toggle="modal" data-bs-target="#portfolioModal1">
                    <div class="portfolio-item-caption-n d-flex align-items-center justify-content-center h-100 w-100">
                        <div class="portfolio-item-caption-n-content text-center text-white"><i class="fas fa-plus fa-3x"></i></div>
                    </div>
                    <img class="img-fluid" src={window.location.origin + "/assets/img/portfolio/" + props.product.replace("/", "_") + ".png"} alt="..." />

                </div>
            </div>
            )
    } else {
        return (
            <div class="col-md-6 col-lg-4 mb-5" onClick={() => props.onClick(props.product)} key={props.product}>
                <div class="portfolio-item mx-auto" data-bs-toggle="modal" data-bs-target="#portfolioModal1">
                    <div class="portfolio-item-caption d-flex align-items-center justify-content-center h-100 w-100">
                        <div class="portfolio-item-caption-content text-center text-white"><i class="fas fa-plus fa-3x"></i></div>
                    </div>
                    <img class="img-fluid" src={window.location.origin + "/assets/img/portfolio/" + props.product.replace("/", "_") + ".png"} alt="..." />


                </div>
            </div>
            )
    }

}


function Recommended(props) {
 
    return (
        <div class="col-md-6 col-lg-4 mb-5" key={props.product + "_recommendation"}>
        <div class="portfolio-item mx-auto" data-bs-toggle="modal" data-bs-target="#portfolioModal1">
            <img class="img-fluid" src={window.location.origin + "/assets/img/portfolio/" + props.product.replace("/", "_") + ".png"} alt="..." />

        </div>
    </div>
    )
}


class Popup extends React.Component {
    render() {

        const Recommendations = ({recommendations}) => (
            <>
              {recommendations.map(reco => (
                <Recommended key = {reco} product={reco}/>
                ))}
            </>
        );

      return (
        // <div className='popup'>
        //   <div className='popup_inner'>


          <section class="page-section bg-primary text-white mb-0" id="recommendations">
                    <div class="container">
                        <h2 class="page-section-heading text-center text-uppercase text-white">Recommendations</h2>
                        <div class="divider-custom divider-light">
                            <div class="divider-custom-line"></div>
                            <div class="divider-custom-icon"><i class="fas fa-star"></i></div>
                            <div class="divider-custom-line"></div>
                        </div>


                    <h4 class="text-uppercase text-center mb-0">What we would recommend for you</h4>



                    <div class="divider-custom divider-light">
                    </div>


                <div class="row justify-content-center">
                    <Recommendations recommendations={this.props.recommendations}/>
                </div>

                <div class="close-button mt-4">
                        <button class="btn btn-xl btn-outline-light" onClick={this.props.closePopup}>
                            <i class="fas fa-download me-2"></i>
                            Go Back To Products ...
                        </button>
                </div>

          </div>
          </section>
        // </div>
        // </div>
      );
    }
  }



class Website extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            product_list : [
                "vegetables",
                "juice",
                "beef",
                "individual meals",
                "flour",
                "shampoo",
                "cereals",
                "poultry",
                "pasta",
                "ketchup",
                "lunch meat",
                "eggs",
                "dinner rolls",
                "ice cream",
                "fruits",
                "cheeses",
                "soap",
                "butter",
                "sugar",
                "bagels",
                "aluminum foil",
                "coffee/tea",
                "dishwashing liquid/detergent",
                "yogurt",
                "laundry detergent",
                "hand soap",
                "waffles",
                "milk",
                "mixes",
                "paper towels",
                "pork",
                "sandwich bags",
                "sandwich loaves",
                "soda",
                "spaghetti sauce",
                "toilet paper",
                "tortillas",
                "all- purpose"
            ],
            basket : [],
            recommendation : [],
            showPopup: false
        }
    }

    togglePopup() {
        this.setState({
          showPopup: !this.state.showPopup
        });
      }

    handleClick(i) {
        var basket = this.state.basket.slice();

        console.log(i)

        if (basket.includes(i)){
            const index = basket.indexOf(i)
            if (index > -1){
                basket.splice(index, 1);
            }
        }else{
            basket.push(i);
        }


        // this.setState({
        //     product_list : this.state.product_list.slice(),
        //     basket : basket
        // })

        function onlyUnique(value, index, self) {
            return self.indexOf(value) === index;
        }

        basket = basket.filter(onlyUnique)

        

        this.setState({basket: basket}, function () {
            this.getRecommendation();
            console.log(this.state.basket)
        });

    }

    getRecommendation() {
        const basket = this.state.basket
        const data = JSON.stringify({products: basket})


        const requestOptions = {
            method: 'POST',
            mode: "cors",
            headers: {
                'Content-Type': 'application/json'
              },
            body: data
        };
        fetch('https://recommender-api-mansoori.herokuapp.com/recommend/', requestOptions)
            .then(response => response.json())
            .then(data => this.setState({ recommendation: data.slice(0,6) }, function () { this.displayRecommendation()}));
    }

    displayRecommendation() {
        this.forceUpdate();
        console.log(this.state.recommendation)
    }

    render() {

        
        const product_list = this.state.product_list.slice();
        const basket = this.state.basket.slice()

        var catalog = {}


        for (let product of product_list) {
            catalog[product] = basket.includes(product)
        }




        const Catalog = ({catalog}) => (
            <>
                {Object.entries(catalog).map(([key, value]) => {
                    return <Product in_basket={value} key={key} product={key} onClick= {i => this.handleClick(i)}/>
                })}
            </>
        );


        // const Catalog = ({product_list}) => (
        //     <>
        //       {product_list.map(product => (
        //         <Product key = {product} product={product} onClick = {i => this.handleClick(i)}/>
        //       ))}
        //     </>
        //   ); 



        const recommendations = this.state.recommendation.slice();



        return (
        <>
            <header class="masthead bg-primary text-white text-center">
            <div class="container d-flex align-items-center flex-column">
                <img class="masthead-avatar mb-5" src={window.location.origin + "/assets/img/icon.jpeg" } alt="..." />
                <h1 class="masthead-heading text-uppercase mb-0">E-Commerce Recommender Demo</h1>
                <div class="divider-custom divider-light">
                    <div class="divider-custom-line"></div>
                    <div class="divider-custom-icon"><i class="fas fa-star"></i></div>
                    <div class="divider-custom-line"></div>
                </div>
                <p class="masthead-subheading font-weight-light mb-0">by Green Software Solutions</p>
            </div>
            </header>



            
            <section class="page-section portfolio" id="portfolio">



            <div class="container">
                <h2 class="page-section-heading text-center text-uppercase text-secondary mb-0">Products</h2>
                <div class="divider-custom">
                    <div class="divider-custom-line"></div>
                    <div class="divider-custom-icon"><i class="fas fa-star"></i></div>
                    <div class="divider-custom-line"></div>
                </div>
                <div class="row justify-content-center">


                    {/* <Catalog product_list={product_list}/> */}
                    <Catalog catalog={catalog} />


                </div>


{/* 
                    {this.state.showPopup ? 
                        <Popup
                            recommendations={recommendations}
                            closePopup={this.togglePopup.bind(this)}
                        />
                        : null
                        } */}


                <Modal
                    isOpen={this.state.showPopup}
                    contentLabel="Recommendation_Popup"
                    onRequestClose={this.togglePopup.bind(this)}
                    className="ReactModal__Content"
                    overlayClassName="Overlay"
                    
                    >
                    <Popup                              
                        recommendations={recommendations}
                        closePopup={this.togglePopup.bind(this)}
                    />
                </Modal>



                    </div>
                </section>
            {!this.state.showPopup ? 
                    <div>
                        <button class="btn btn-xl btn-outline-dark scrollTop" onClick={this.togglePopup.bind(this)}>Recommendations</button>
                    </div>
                    : null
                    }


            </>        
        )
    }
}

// ========================================

ReactDOM.render(
    <Website />,
    document.getElementById('root')
  );
  