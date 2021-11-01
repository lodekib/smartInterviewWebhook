const fs= require('fs');
const nodemailer=require('nodemailer');
const stream=require('stream');
const reportDocument=require('pdfkit');
const { sendMail }  =require('../mailing/email');


module.exports={
    report:function(){

        const doc=new reportDocument({
            layout:'landscape',
            size:'A4'
        });
        
        const buffers=[];
        doc.registerFont('Arial-Black','arial-black.ttf');
        doc.on('data',buffers.push.bind(buffers));
        doc.on('end',()=>{
            let reportData=Buffer.concat(buffers);
             sendMail(reportData);
        });


        function jumpLine(doc,lines){
            for(let index=0;index<lines; index++){
                doc.moveDown();
            }
        }

        doc.pipe(fs.createWriteStream('report.pdf'));
        doc.rect(0,0,doc.page.width,doc.page.height).fill('#fff');
        doc.fontSize(10);

        const distanceMargin=18;
        const maxWidth=600;
        const maxHeight=150;

        doc.circle(4,4,150)
            .lineWidth(3)
            .fillOpacity(0.5)
            .fillAndStroke('#3400f6','#987654')

        doc
            .circle(800,620,150)
            .lineWidth(3)
            .fillOpacity(0.5)
            .fillAndStroke('#3400f6','#987654')   
        
        doc.image('./public/karma.png', doc.page.width / 2 - maxWidth / 2,5, {
                fit: [maxWidth, maxHeight],
                align: 'center',
              });
        
        jumpLine(doc,10);
        
        doc.font('Times-Bold')
           .fontSize(40)
           .fill('#000000')
           .text('INTERVIEW REPORT',{
               align:'center'
           });
        
        jumpLine(doc,10);   
    }
}
