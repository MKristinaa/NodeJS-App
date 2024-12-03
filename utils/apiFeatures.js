class APIFeatures{
    constructor(query, queryStr){
        this.query = query;
        this.queryStr = queryStr;
    }

    search() {
        const keyword = this.queryStr.keyword ? {
            $or: [
                { taskTitle: { $regex: this.queryStr.keyword, $options: 'i' } },
                { taskDescription: { $regex: this.queryStr.keyword, $options: 'i' } },
                { subject: { $regex: this.queryStr.keyword, $options: 'i' } },
                { classType: { $regex: this.queryStr.keyword, $options: 'i' } },
            ]
        } : {};
    
        console.log(keyword);
    
        this.query = this.query.find({ ...keyword });
        return this;
    }
    

    filter() {
        const queryCopy = { ...this.queryStr };
    
        const removeFields = ['keyword', 'limit', 'page'];
        removeFields.forEach(el => delete queryCopy[el]);
    
        if (queryCopy.subject) {
            queryCopy.subject = { $regex: queryCopy.subject, $options: 'i' };
        }
    
        if (queryCopy.type) {
            queryCopy.type = { $regex: queryCopy.type, $options: 'i' };
        }
    
        let queryStr = JSON.stringify(queryCopy);
        queryStr = queryStr.replace(/\b(gt|gte|lt|lte)\b/g, match => `$${match}`);
    
        this.query = this.query.find(JSON.parse(queryStr));
        return this;
    }
    


    pagination(resPerPage) {
        const currentPage = Number(this.queryStr.page) || 1;
        const skip = resPerPage * (currentPage - 1);

        this.query = this.query.limit(resPerPage).skip(skip);
        return this;
    }
}

module.exports = APIFeatures