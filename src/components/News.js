import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';

export class News extends Component {
                
    constructor(){
        super();
        this.state={
                articles: [],
                loading:false,
                page:1
        }
      }

      async componentDidMount(){
        let url=`https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=f13c71a4dd5c4bd3aa5b644dceb0d644&page=pagesize=${ this.props.pageSizes}`;
        let data= await fetch(url);
        let parsedData=await data.json()
        console.log(parsedData);
        this.setState({articles: parsedData.articles,
          totalResults: parsedData.totalResults,
          loading : false}) 
      }


      // handlePrevClick= async ()=>{
      //   console.log('Previous');
      //   let url=`https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=f13c71a4dd5c4bd3aa5b644dceb0d644&page=${this.state.page -1}&pagesize=${this.props.pageSizes}`;
      //   this.setState({loading: true});
      //   let data= await fetch(url);
      //   let parsedData=await data.json()
      //   console.log(parsedData);
      //   this.setState({
      //     page:this.state.page -1,
      //     articles: parsedData.articles,
      //     loading: false
      //   })
      // }

      handlePrevClick = async () => {
        console.log(this); // Ensure 'this' is the class instance
        console.log('Previous');
        if (this.state.page <= 1) {
          console.warn('No previous pages available.');
          return;
        }
        let url = `https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=f13c71a4dd5c4bd3aa5b644dceb0d644&page=${this.state.page - 1}&pagesize=${this.props.pageSizes}`;
        this.setState({ loading: true });
        try {
          let data = await fetch(url);
          if (!data.ok) throw new Error(`HTTP error! Status: ${data.status}`);
          let parsedData = await data.json();
          console.log(parsedData);
          this.setState((prevState) => ({
            page: prevState.page - 1,
            articles: parsedData.articles,
            loading: false
          }));
        } catch (error) {
          console.error('Error fetching data:', error);
          this.setState({ loading: false });
        }
      };
      


      // handleNextClick= async ()=>{
      //   console.log('Next');

      //   if(!(this.state.page + 1 > Math.ceil(this.state.totalResults/this.props.pageSizes))){
      //       let url=`https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=f13c71a4dd5c4bd3aa5b644dceb0d644&page=${this.state.page +1}&pagesize=${this.props.pageSizes}`;

      //       this.setState({loading: true});
            
      //       let data= await fetch(url);
      //       let parsedData=await data.json()
      //       this.setState({
      //         page:this.state.page +1,
      //         articles: parsedData.articles,
      //         loading : false
      //       })
      //   }
      // }
    
      handleNextClick = async () => {
        console.log('Next');
        
        // Check if the next page exceeds the total number of pages
        if (!(this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pageSizes))) {
          let url = `https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=f13c71a4dd5c4bd3aa5b644dceb0d644&page=${this.state.page + 1}&pagesize=${this.props.pageSizes}`;
          
          this.setState({ loading: true });
      
          try {
            let data = await fetch(url);
            if (!data.ok) throw new Error(`HTTP error! Status: ${data.status}`);
            
            let parsedData = await data.json();
            
            this.setState((prevState) => ({
              page: prevState.page + 1,
              articles: parsedData.articles,
              loading: false
            }));
          } catch (error) {
            console.error('Error fetching data:', error);
            this.setState({ loading: false });
          }
        }
      };
      

  render() {
    return (
        <div className='container my-3'>
                <h1 className='text-center'>NewsMonkey-Top Headlines</h1>
                  {this.state.loading && <Spinner/>}
                <div className='row'>
                    {!this.state.loading && this.state.articles.map((element)=> {
                      return  <div className='col-md-4' key={element.url}>
                            <NewsItem title={element.title?element.title:''} description={element.description?element.description:''} imageUrl={element.urlToImage} newsUrl={element.url}/>
                        </div>
                    })}
                </div>
                <div className='container d-flex justify-content-between' >
                <button disabled={this.state.page<=1} type="button" className="btn btn-dark" onClick={this.handlePrevClick} >&larr; Previous</button>
                <button disabled={this.page + 1 > Math.ceil(this.state.totalResults/this.props.pageSizes)} type="button" className="btn btn-dark" onClick={this.handleNextClick}>Next &rarr;</button>
                </div>
        </div>
    )
  }
}

export default News
