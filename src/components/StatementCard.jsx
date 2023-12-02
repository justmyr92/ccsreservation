import React from "react";

const StatementCard = () => {
    const statements = [
        {
            title: "Satisfied client! Excellent food and service.... :)",
            content:
                "I was very pleased with the catering services from Calinao for my birthday last month. Satisfied client! Excellent food and service.... :) The food was absolutely delicious, and all of my guests were raving about it. The chicken italiano and sweet and sour fish were big hits.",
            name: "Allyza Valdez-Panopio",
            position: "Customer",
        },
        {
            title: "Our guest super loved it!! ",
            content:
                "Thank you, Calinao’s Catering Catering, for elegantly dressing up our place for our Post Wedding Celebration! Our guest super loved it!! Not to mention the suuppeerrrr yummy dish!",
            name: "Donna Lou",
            position: "Customer",
        },
        {
            title: "An occasion truly worth remembering.",
            content:
                "Our sincerest gratitude to Calinao’s Catering Services for making our Inay’s 60th birthday celebrate an occasion truly worth remembering. Thank you Pareng Romeo Calinao and Mareng Ailleen Calinao.",
            name: "Lanievi DP",
            position: "Customer",
        },
        {
            title: "Lovely food and great service!",
            content:
                "Appreciation to Calinao’s Catering for a job well done on my daughters bday part last October, The owner Sir Romeo Caliao was outstandingly helpful in making the event a success, with the beautiful elegant decoration, lovely food and great service, it’s highly recommended!",
            name: "Regie Landicho Bullagay",
            position: "Customer",
        },
        {
            title: "Masarap ang foods and affordable.",
            content:
                "Thank you po sa Magandang catering service last 60th bday celebration ng mom ko. Till now po madaming feedback sa mga taga dito na ang ganda ng catering nyo – maganda yung ayos, masarap ang foods and affordable. Thank you and keep it up! Godbless po. Sa uulitin!",
            name: "Stephanie Mariz",
            position: "Customer",
        },
        {
            title: "Mauulit po na magpacater kami sa inyo.",
            content:
                "Hi! I’m so thankful po sa Magandang service nyo. Ang ganda ng set up at masarap ang food. Tinatanong nga po ng mga bisita kung saan kami nag pa-cater. Most probably kukunin din nila kayo kapag nangailangan sila ng cater. Maraming maraming salamat po. Mauulit po na magpacater kami sa inyo.",
            name: "Private Customer",
        },
        {
            title: "Elegant decorations and impressive service",
            content:
                "Thank you very much Calinao’s Catering for an excellent service during my Mother’s 80th Birthday celebration. It’s fantastic to work with Calinao’s Catering, you are truly the best. I would certainly want to work with you again and would absolutely recommend to others. ",
            name: "Ruel Magracia",
            position: "Customer",
        },
        {
            title: "Would like to commend them for brilliant set up.",
            content:
                "Kahit may konting glitches na nangyari before preparing the resort, still they we’re able to cope up. The food itself is marasap, yung service ng mga staff, super supportive and above all super approachable ng mag asawang Romeo Calinao. Thanks for making our son’s event successful!",
            name: "Yam Cuento",
            position: "Customer",
        },
        {
            title: "Fully satisfied po kami.",
            content:
                "Thank you po ng madam isa magandang arranement at display sa 30th anniversary ng aming parents. Fully satisfied po kami sa service po. Sa next event po ulit!",
            name: "Karen Andal Doce",
            position: "Customer",
        },
        {
            title: "No regret po for choosing you.",
            content:
                "Salamat po Ma’am Aileen and to the whole staff od Calinao’s Catering. I am beyond satisfied with your service and foods. No regret po for choosing you. Thank you for making our occasion extra special.",
            name: "Chirstine Ayeen Perez",
            position: "Customer",
        },
    ];

    return (
        <>
            {statements.map((statement, index) => (
                <div
                    className={`statement-card min-w-[23rem] h-[26rem] border bg-white
                    ${
                        index === 0
                            ? "rounded-ss-lg"
                            : index === statements.length - 1
                            ? "rounded-ee-lg border-l-0"
                            : "border-l-0"
                    }
                    `}
                    key={index}
                >
                    <div className="statement-card-container p-10">
                        <div className="statement-card-content min-h-[15rem]">
                            <h3 className="text-xl font-medium text-gray-900 mb-5 italic">
                                "{statement.title}"
                            </h3>
                            <p className="text-justify text-gray-800 text-sm">
                                {statement.content}
                            </p>
                        </div>
                        <div className="statement-card-footer border-t border-gray-200 pt-5">
                            <h3 className="text-lg font-bold text-gray-800">
                                {statement.name}
                            </h3>
                            <p className="text-start text-gray-600 text-sm">
                                {statement.position}
                            </p>
                        </div>
                    </div>
                </div>
            ))}
        </>
    );
};

export default StatementCard;
