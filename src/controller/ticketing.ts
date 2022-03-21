import { Request, Response, NextFunction } from 'express';

//dummy data
interface Ticket{
    name: string;
    issue: string;
    description: string;
    id?: number;
    status?: string;
}

interface User{
    id: number;
    name: string;
    permissions: number;
}
const tickets: Array<Ticket> = [
        {
          "name": "Christensen",
          "issue": "magna occaecat et commodo",
          "description": "Exercitation eu enim cupidatat non ipsum aliquip laboris nostrud amet.",
          "status": "Closed",
          "id": 0
        },
        {
          "name": "Lesley",
          "issue": "qui consequat quis id",
          "description": "Sint laborum ex elit irure sint pariatur dolore.",
          "status": "Opened",
          "id": 1
        },
        {
          "name": "Macias",
          "issue": "sint laboris excepteur aliquip",
          "description": "Id qui proident anim eiusmod.",
          "status": "Opened",
          "id": 2
        },
        {
          "name": "Shields",
          "issue": "dolore id consectetur ut",
          "description": "Id culpa ex est quis et proident culpa nisi aliquip mollit commodo eiusmod proident.",
          "status": "Closed",
          "id": 3
        },
        {
          "name": "Annabelle",
          "issue": "adipisicing elit commodo aliqua",
          "description": "Fugiat aute ea laborum aliqua cupidatat voluptate labore.",
          "status": "Closed",
          "id": 4
        },
        {
          "name": "Pitts",
          "issue": "minim consequat nostrud consequat",
          "description": "Fugiat duis amet ut cillum qui proident reprehenderit irure.",
          "status": "Closed",
          "id": 5
        },
        {
          "name": "Belinda",
          "issue": "ea nostrud fugiat commodo",
          "description": "Occaecat ea excepteur sint et dolor excepteur mollit aliqua consectetur amet commodo velit.",
          "status": "Closed",
          "id": 6
        },
        {
          "name": "Sargent",
          "issue": "incididunt laboris amet officia",
          "description": "Consectetur aliquip laborum nulla minim.",
          "status": "Opened",
          "id": 7
        },
        {
          "name": "Gay",
          "issue": "duis magna consequat aliquip",
          "description": "Magna ad deserunt fugiat consequat commodo.",
          "status": "Opened",
          "id": 8
        },
        {
          "name": "Robinson",
          "issue": "incididunt ut laborum commodo",
          "description": "Quis ut culpa exercitation dolor.",
          "status": "Opened",
          "id": 9
        },
        {
          "name": "Kathryn",
          "issue": "culpa commodo amet veniam",
          "description": "Non amet ex nulla aliquip id proident aute laboris duis irure do.",
          "status": "Closed",
          "id": 10
        },
        {
          "name": "Ines",
          "issue": "do cillum proident magna",
          "description": "Fugiat occaecat ipsum sit veniam laborum occaecat.",
          "status": "Opened",
          "id": 11
        },
        {
          "name": "Maxwell",
          "issue": "voluptate reprehenderit consequat elit",
          "description": "Est ex duis occaecat qui ea aliqua anim proident labore.",
          "status": "Assigned",
          "id": 12
        },
        {
          "name": "Ina",
          "issue": "consequat proident qui sit",
          "description": "Reprehenderit irure labore ullamco sit laboris culpa pariatur proident veniam duis magna aliqua.",
          "status": "Assigned",
          "id": 13
        },
        {
          "name": "Marsha",
          "issue": "enim veniam pariatur in",
          "description": "Commodo exercitation enim sit qui adipisicing qui veniam.",
          "status": "Closed",
          "id": 14
        },
        {
          "name": "Elvia",
          "issue": "amet aliqua laborum laborum",
          "description": "Dolore qui sit deserunt id consectetur dolore fugiat nulla duis qui ex aute.",
          "status": "Assigned",
          "id": 15
        },
        {
          "name": "Hardin",
          "issue": "ad ipsum ut cillum",
          "description": "Nostrud sunt irure non fugiat fugiat in aliquip cupidatat aute est velit exercitation consectetur laborum.",
          "status": "Opened",
          "id": 16
        },
        {
          "name": "Jacobson",
          "issue": "id proident dolore proident",
          "description": "Voluptate veniam voluptate commodo enim deserunt consequat aliqua ipsum.",
          "status": "Opened",
          "id": 17
        },
        {
          "name": "Nicole",
          "issue": "velit ad esse voluptate",
          "description": "Exercitation ex et dolor sint ullamco laboris est Lorem.",
          "status": "Opened",
          "id": 18
        },
        {
          "name": "Oconnor",
          "issue": "sint ex aliqua deserunt",
          "description": "Est irure nulla quis ullamco ad magna tempor tempor eiusmod ipsum incididunt laboris mollit culpa.",
          "status": "Assigned",
          "id": 19
        },
        {
          "name": "Hodges",
          "issue": "eiusmod aliquip consectetur cupidatat",
          "description": "Adipisicing qui ex occaecat do non adipisicing aliqua consequat duis sint voluptate aliqua commodo sit.",
          "status": "Assigned",
          "id": 20
        },
        {
          "name": "Sandra",
          "issue": "consectetur ut Lorem aliquip",
          "description": "Ex elit elit adipisicing et tempor sint ad aute minim proident minim ex laborum.",
          "status": "Opened",
          "id": 21
        },
        {
          "name": "Hunt",
          "issue": "pariatur labore aliquip aute",
          "description": "Tempor id proident aliqua consequat ullamco elit fugiat cillum esse do esse nisi minim.",
          "status": "Assigned",
          "id": 22
        },
        {
          "name": "Lynn",
          "issue": "dolor ex qui dolore",
          "description": "Mollit sunt occaecat nisi dolor.",
          "status": "Assigned",
          "id": 23
        },
        {
          "name": "Hannah",
          "issue": "anim consectetur dolore anim",
          "description": "Officia cupidatat occaecat culpa aute fugiat ut ea cupidatat nisi officia nisi.",
          "status": "Assigned",
          "id": 24
        },
        {
          "name": "Diaz",
          "issue": "sit excepteur sunt aute",
          "description": "Qui esse aute laborum officia.",
          "status": "Assigned",
          "id": 25
        },
        {
          "name": "Merrill",
          "issue": "nulla ut occaecat consequat",
          "description": "Occaecat in dolor sit dolore.",
          "status": "Closed",
          "id": 26
        },
        {
          "name": "Holman",
          "issue": "magna pariatur nulla minim",
          "description": "Culpa incididunt excepteur anim tempor esse velit minim laboris ex cillum ea enim aute incididunt.",
          "status": "Opened",
          "id": 27
        },
        {
          "name": "Shaffer",
          "issue": "deserunt velit esse pariatur",
          "description": "Exercitation eu in enim laboris dolor.",
          "status": "Opened",
          "id": 28
        },
        {
          "name": "Brady",
          "issue": "veniam dolore ullamco deserunt",
          "description": "Mollit proident cupidatat reprehenderit velit laborum occaecat est ex laborum cillum veniam in magna.",
          "status": "Closed",
          "id": 29
        },
        {
          "name": "Cooke",
          "issue": "aute ut commodo aute",
          "description": "Officia in mollit ipsum duis reprehenderit esse proident cupidatat nostrud exercitation ad.",
          "status": "Assigned",
          "id": 30
        },
        {
          "name": "Compton",
          "issue": "officia magna minim nulla",
          "description": "Veniam fugiat velit sit eiusmod enim ex amet cupidatat ullamco irure dolor mollit.",
          "status": "Opened",
          "id": 31
        },
        {
          "name": "Lindsey",
          "issue": "sit cupidatat consequat excepteur",
          "description": "Ipsum tempor culpa magna sint sunt irure elit quis.",
          "status": "Opened",
          "id": 32
        },
        {
          "name": "Green",
          "issue": "est laboris id culpa",
          "description": "Cillum proident tempor mollit commodo.",
          "status": "Opened",
          "id": 33
        },
        {
          "name": "Vance",
          "issue": "esse duis quis eu",
          "description": "In magna elit et cillum minim aliqua cillum nulla sit minim exercitation.",
          "status": "Assigned",
          "id": 34
        },
        {
          "name": "Hanson",
          "issue": "labore qui aliquip id",
          "description": "Labore officia eu consequat officia quis duis labore nisi enim.",
          "status": "Opened",
          "id": 35
        },
        {
          "name": "Felecia",
          "issue": "eu ut excepteur tempor",
          "description": "Ea officia dolore anim nisi cillum eiusmod pariatur velit sit laborum magna minim.",
          "status": "Closed",
          "id": 36
        },
        {
          "name": "Madden",
          "issue": "nisi magna Lorem pariatur",
          "description": "Est voluptate reprehenderit dolor excepteur qui pariatur tempor aliquip enim consectetur.",
          "status": "Assigned",
          "id": 37
        },
        {
          "name": "Janie",
          "issue": "aute duis aliqua ad",
          "description": "Dolor cillum et dolor dolore laborum in fugiat cillum.",
          "status": "Opened",
          "id": 38
        },
        {
          "name": "Holden",
          "issue": "qui labore eu duis",
          "description": "Esse proident veniam aliquip qui ad minim nulla eiusmod adipisicing elit.",
          "status": "Opened",
          "id": 39
        },
        {
          "name": "Mcclure",
          "issue": "adipisicing tempor ea cupidatat",
          "description": "Laborum tempor eiusmod sunt nostrud nulla Lorem tempor id enim.",
          "status": "Closed",
          "id": 40
        },
        {
          "name": "Frances",
          "issue": "eu eiusmod enim eu",
          "description": "Cupidatat esse minim laboris ex esse enim voluptate ex incididunt voluptate.",
          "status": "Assigned",
          "id": 41
        },
        {
          "name": "Ruth",
          "issue": "commodo nisi do culpa",
          "description": "Anim ea quis voluptate do in occaecat do commodo labore.",
          "status": "Opened",
          "id": 42
        },
        {
          "name": "Rush",
          "issue": "anim amet minim laboris",
          "description": "Laboris esse cillum officia laborum eiusmod dolore amet duis non dolore elit.",
          "status": "Closed",
          "id": 43
        },
        {
          "name": "Porter",
          "issue": "dolore est exercitation laboris",
          "description": "Ipsum esse velit sit fugiat reprehenderit qui reprehenderit Lorem nostrud excepteur cupidatat.",
          "status": "Closed",
          "id": 44
        },
        {
          "name": "Constance",
          "issue": "reprehenderit magna tempor sunt",
          "description": "Consectetur aute ea commodo magna mollit ea deserunt laboris elit.",
          "status": "Closed",
          "id": 45
        },
        {
          "name": "Barrera",
          "issue": "tempor deserunt incididunt enim",
          "description": "Cillum nulla est exercitation officia sunt excepteur nulla est eu qui sit consectetur deserunt.",
          "status": "Closed",
          "id": 46
        },
        {
          "name": "Carter",
          "issue": "qui et Lorem fugiat",
          "description": "Eu elit amet ea ex occaecat ullamco cillum aute magna ullamco anim sint.",
          "status": "Closed",
          "id": 47
        },
        {
          "name": "Callie",
          "issue": "consequat exercitation eiusmod aute",
          "description": "Nisi aute sint ut irure ex incididunt adipisicing veniam ut.",
          "status": "Closed",
          "id": 48
        },
        {
          "name": "Mack",
          "issue": "duis ipsum enim eiusmod",
          "description": "Mollit cupidatat non irure dolore deserunt sit veniam ea adipisicing minim.",
          "status": "Closed",
          "id": 49
        },
        {
          "name": "Houston",
          "issue": "esse duis tempor tempor",
          "description": "Ipsum id et velit amet sunt incididunt consequat consequat elit velit magna enim esse aute.",
          "status": "Assigned",
          "id": 50
        },
        {
          "name": "Susanne",
          "issue": "duis consequat cillum minim",
          "description": "Sunt nostrud dolor pariatur ullamco dolore.",
          "status": "Closed",
          "id": 51
        },
        {
          "name": "Jo",
          "issue": "ullamco ad commodo id",
          "description": "Commodo cillum dolore et cillum commodo magna enim dolor do Lorem aliqua ad incididunt.",
          "status": "Opened",
          "id": 52
        },
        {
          "name": "Alison",
          "issue": "in esse in nulla",
          "description": "Exercitation reprehenderit irure proident sint eu nulla deserunt.",
          "status": "Closed",
          "id": 53
        },
        {
          "name": "Guadalupe",
          "issue": "do labore qui nisi",
          "description": "Consectetur mollit irure cupidatat adipisicing laborum.",
          "status": "Opened",
          "id": 54
        },
        {
          "name": "Noelle",
          "issue": "cupidatat quis reprehenderit occaecat",
          "description": "Excepteur dolore non dolor deserunt sunt ex eiusmod consequat cillum proident ipsum ad id ea.",
          "status": "Opened",
          "id": 55
        },
        {
          "name": "Charlene",
          "issue": "consectetur irure enim veniam",
          "description": "Exercitation ea ex occaecat aliqua officia tempor enim in.",
          "status": "Assigned",
          "id": 56
        },
        {
          "name": "Naomi",
          "issue": "Lorem ad ullamco culpa",
          "description": "Exercitation cupidatat nulla deserunt laborum aliqua fugiat.",
          "status": "Opened",
          "id": 57
        },
        {
          "name": "Myers",
          "issue": "id id ea ut",
          "description": "Est sit elit est enim.",
          "status": "Assigned",
          "id": 58
        },
        {
          "name": "Bauer",
          "issue": "dolor dolore adipisicing velit",
          "description": "Laboris incididunt esse ipsum ipsum adipisicing voluptate cupidatat reprehenderit deserunt nostrud labore nisi deserunt ex.",
          "status": "Closed",
          "id": 59
        },
        {
          "name": "Bryan",
          "issue": "minim ea velit cupidatat",
          "description": "Ullamco aliqua non reprehenderit voluptate laboris veniam.",
          "status": "Closed",
          "id": 60
        },
        {
          "name": "Bonner",
          "issue": "et qui cillum tempor",
          "description": "Ullamco sit ad proident nulla consequat sit nisi pariatur.",
          "status": "Closed",
          "id": 61
        },
        {
          "name": "Reyna",
          "issue": "ipsum in exercitation id",
          "description": "Anim occaecat aliqua commodo irure nisi veniam ullamco veniam quis.",
          "status": "Assigned",
          "id": 62
        },
        {
          "name": "Consuelo",
          "issue": "cillum tempor labore sunt",
          "description": "Quis occaecat minim ut ad ut sint dolor duis id eu aliqua sunt.",
          "status": "Opened",
          "id": 63
        },
        {
          "name": "Hatfield",
          "issue": "cupidatat elit voluptate duis",
          "description": "Sunt aute sint adipisicing ea sit duis.",
          "status": "Assigned",
          "id": 64
        },
        {
          "name": "Strong",
          "issue": "ipsum enim commodo aliqua",
          "description": "Mollit voluptate esse adipisicing ipsum velit est amet ut deserunt deserunt in.",
          "status": "Assigned",
          "id": 65
        },
        {
          "name": "Amanda",
          "issue": "ea qui excepteur adipisicing",
          "description": "Amet officia duis nulla pariatur pariatur.",
          "status": "Closed",
          "id": 66
        },
        {
          "name": "Carolyn",
          "issue": "laborum ad voluptate Lorem",
          "description": "Magna culpa laborum irure laboris commodo deserunt velit minim reprehenderit nisi.",
          "status": "Opened",
          "id": 67
        },
        {
          "name": "Sasha",
          "issue": "ut occaecat commodo magna",
          "description": "Aliqua pariatur minim sint do labore.",
          "status": "Opened",
          "id": 68
        },
        {
          "name": "Latonya",
          "issue": "sunt sunt sunt proident",
          "description": "Cillum aliqua mollit esse laboris laborum.",
          "status": "Assigned",
          "id": 69
        },
        {
          "name": "Maude",
          "issue": "id minim cupidatat minim",
          "description": "Velit duis pariatur ex labore aliquip do nostrud officia cillum exercitation proident.",
          "status": "Closed",
          "id": 70
        },
        {
          "name": "Ingrid",
          "issue": "sit laboris officia anim",
          "description": "Cupidatat Lorem laboris nisi cillum.",
          "status": "Closed",
          "id": 71
        },
        {
          "name": "Krista",
          "issue": "consectetur aute pariatur reprehenderit",
          "description": "Do aute consequat aliqua amet irure do enim sunt sit pariatur officia commodo minim velit.",
          "status": "Assigned",
          "id": 72
        },
        {
          "name": "Graham",
          "issue": "irure cupidatat Lorem laborum",
          "description": "Dolor amet eu et fugiat qui quis exercitation elit incididunt nostrud.",
          "status": "Opened",
          "id": 73
        },
        {
          "name": "Shanna",
          "issue": "anim ullamco dolor pariatur",
          "description": "Deserunt elit veniam magna anim do est Lorem in reprehenderit aliqua anim consectetur fugiat.",
          "status": "Closed",
          "id": 74
        },
        {
          "name": "Emily",
          "issue": "exercitation sit quis mollit",
          "description": "Cillum in esse est labore aliqua amet labore sit voluptate dolor.",
          "status": "Opened",
          "id": 75
        },
        {
          "name": "Branch",
          "issue": "magna occaecat reprehenderit dolor",
          "description": "Excepteur magna aliqua voluptate sit sint duis consectetur.",
          "status": "Assigned",
          "id": 76
        },
        {
          "name": "Sawyer",
          "issue": "irure sunt qui labore",
          "description": "Esse exercitation magna proident velit eiusmod aliqua do minim.",
          "status": "Opened",
          "id": 77
        },
        {
          "name": "Ginger",
          "issue": "enim nulla proident laborum",
          "description": "Culpa ullamco ullamco cupidatat culpa dolor nisi enim deserunt voluptate duis eiusmod nostrud veniam.",
          "status": "Opened",
          "id": 78
        },
        {
          "name": "Elsa",
          "issue": "pariatur exercitation incididunt mollit",
          "description": "Enim nulla eiusmod nulla occaecat mollit nostrud exercitation est aute ex.",
          "status": "Opened",
          "id": 79
        },
        {
          "name": "Leonard",
          "issue": "sint irure ut anim",
          "description": "Est non eiusmod labore ut.",
          "status": "Assigned",
          "id": 80
        },
        {
          "name": "Whitney",
          "issue": "eiusmod qui elit ad",
          "description": "Do aliquip ut in duis et ad.",
          "status": "Opened",
          "id": 81
        },
        {
          "name": "Stone",
          "issue": "enim eiusmod do excepteur",
          "description": "Nostrud do veniam labore consequat deserunt sit enim qui consequat est et.",
          "status": "Closed",
          "id": 82
        },
        {
          "name": "Lawanda",
          "issue": "et veniam amet exercitation",
          "description": "Aliqua ex aliquip minim ex ex ea non.",
          "status": "Opened",
          "id": 83
        },
        {
          "name": "Ingram",
          "issue": "et ea commodo culpa",
          "description": "Nulla est tempor sit ad est et ad duis minim dolor dolore consequat.",
          "status": "Assigned",
          "id": 84
        },
        {
          "name": "Darcy",
          "issue": "aliqua reprehenderit ut commodo",
          "description": "Sit adipisicing dolor laboris laboris dolor aute officia consectetur deserunt sunt eiusmod eiusmod.",
          "status": "Opened",
          "id": 85
        },
        {
          "name": "Muriel",
          "issue": "consequat Lorem anim consectetur",
          "description": "Deserunt reprehenderit incididunt aliqua reprehenderit mollit voluptate pariatur id consectetur excepteur occaecat.",
          "status": "Assigned",
          "id": 86
        },
        {
          "name": "Ray",
          "issue": "ea sunt velit eiusmod",
          "description": "Nostrud esse aliquip laborum est est ut exercitation magna sit pariatur velit.",
          "status": "Assigned",
          "id": 87
        },
        {
          "name": "Deborah",
          "issue": "tempor amet magna mollit",
          "description": "Aliquip occaecat non velit irure mollit non do nisi consequat et ullamco do ea minim.",
          "status": "Closed",
          "id": 88
        },
        {
          "name": "Kimberly",
          "issue": "veniam fugiat sunt amet",
          "description": "Irure tempor quis sit deserunt.",
          "status": "Closed",
          "id": 89
        },
        {
          "name": "Brown",
          "issue": "labore nulla irure aliqua",
          "description": "Voluptate incididunt aliquip laboris aliquip nisi sit non.",
          "status": "Closed",
          "id": 90
        },
        {
          "name": "Mueller",
          "issue": "esse eiusmod deserunt laborum",
          "description": "Fugiat ad sint qui excepteur in.",
          "status": "Closed",
          "id": 91
        },
        {
          "name": "Elizabeth",
          "issue": "officia commodo reprehenderit culpa",
          "description": "Velit et consectetur laborum est sit fugiat amet incididunt nulla.",
          "status": "Assigned",
          "id": 92
        },
        {
          "name": "Latasha",
          "issue": "adipisicing nulla occaecat aliqua",
          "description": "Proident magna non commodo id qui.",
          "status": "Opened",
          "id": 93
        },
        {
          "name": "Charles",
          "issue": "occaecat minim magna duis",
          "description": "Sunt sunt ut quis tempor et dolor mollit adipisicing dolore irure labore sunt.",
          "status": "Assigned",
          "id": 94
        },
        {
          "name": "Alford",
          "issue": "magna Lorem in voluptate",
          "description": "Ullamco irure elit duis ut nulla.",
          "status": "Assigned",
          "id": 95
        },
        {
          "name": "Courtney",
          "issue": "ex pariatur sint nulla",
          "description": "Sunt irure aliqua dolor dolore deserunt reprehenderit elit nisi aliqua enim incididunt nisi exercitation excepteur.",
          "status": "Assigned",
          "id": 96
        },
        {
          "name": "Benton",
          "issue": "deserunt cillum ut proident",
          "description": "Enim mollit nulla ad aute aliqua.",
          "status": "Opened",
          "id": 97
        },
        {
          "name": "Maricela",
          "issue": "amet sit anim sint",
          "description": "Aliquip anim nisi dolore dolor laboris est labore.",
          "status": "Assigned",
          "id": 98
        },
        {
          "name": "Watkins",
          "issue": "exercitation enim adipisicing ullamco",
          "description": "Sint reprehenderit do aute mollit sint in esse irure ea voluptate.",
          "status": "Assigned",
          "id": 99
        }
      ]

const dummyUsers: Array<User> = [
    {
        "id": 0,
        "name": "Buckner",
        "permissions": 0
    },
    {
        "id": 1,
        "name": "Mccullough",
        "permissions": 1
    }

]


const getTickets = async (req: Request, res: Response, next: NextFunction) => {
    try{
        return res.status(200).json(tickets);
    }
    catch {
        return res.status(500).json({message: "Something went wrong"});
    }
}

const getUser = async (req: Request, res: Response, next: NextFunction) => {
    try{
        const id = Number(req.params.id);
        const user = dummyUsers.find(user => user.id == id);
        return res.status(200).json(user);
    }
    catch{
        return res.status(400);
    }
}



export default {getTickets, getUser}