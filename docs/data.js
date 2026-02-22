// Park City Ski Guide — Structured Data
// Extracted from Insider's Guide YouTube series transcripts

const DATA = {

  // ============================================================
  // TRAILS TAB — organized by side → lift → trails
  // ============================================================
  trails: {
    mountainVillage: [
      {
        lift: "Town Lift",
        liftInfo: "fixed grip triple — long ride, rarely has lines",
        trails: [
          { name: "Creole", difficulty: "blue", desc: "Preferred ski-to-town route, scenic bridge into downtown; gets slushy even mid-season" },
          { name: "Quit 'N Time", difficulty: "blue", desc: "More road segments; Creole is the better choice" }
        ]
      },
      {
        lift: "Eagle",
        liftInfo: "triple",
        trails: [
          { name: "CBS", difficulty: "black", desc: "Fantastic steep cruiser, but often closed for racing" }
        ]
      },
      {
        lift: "3 Kings",
        liftInfo: "triple with loading carpet",
        trails: [
          { name: "Terrain Parks", difficulty: "varies", desc: "Largest terrain parks at PC: big/medium jumps + large halfpipe" }
        ]
      },
      {
        lift: "First Time",
        liftInfo: "detachable — ski school prioritized, slow general public line",
        trails: [
          { name: "First Time", difficulty: "green", desc: "True bunny hill, fully segregated from advanced traffic" },
          { name: "Silver Hollow", difficulty: "blue", desc: "Quite mild for a blue, only accessible from 3 Kings" },
          { name: "Turtle Trail / Stoope", difficulty: "green", desc: "Gentle beginner slopes leading to Home Run" }
        ]
      },
      {
        lift: "Payday",
        liftInfo: "main out-of-base lift — busy mornings, excellent afternoon laps",
        trails: [
          { name: "Payday", difficulty: "blue", desc: "Marquee run; excellent wide cruiser, best in pod" },
          { name: "King's Crown", difficulty: "blue", desc: "Starts mild then gets narrower and steeper than expected" },
          { name: "Heckler", difficulty: "blue", desc: "Not groomed nightly, develops small moguls" },
          { name: "Blanche", difficulty: "green", desc: "Standard green with adventure zone running parallel" },
          { name: "Widowmaker", difficulty: "black", desc: "Standard long black bump run" },
          { name: "Nail Driver", difficulty: "black", desc: "Standard long black bump run" },
          { name: "Dividend", difficulty: "black", desc: "Not groomed nightly, shortcut to Treasure Hollow; solid tree skiing between it and Widowmaker" },
          { name: "Treasure Hollow", difficulty: "blue", desc: "Main valley run, gets busy but fairly wide" },
          { name: "Home Run", difficulty: "green", desc: "Wide for most part, narrows at corners" },
          { name: "Lower Silver Skis", difficulty: "blue", desc: "Easy side of blue, unsigned but prominent entrance" },
          { name: "Drift", difficulty: "green", desc: "Narrow and very busy; avoid if possible" },
          { name: "Waterfall", difficulty: "black", desc: "Deceptively mild start, develops into serious mogul field quickly", warning: "Don't be fooled by the entrance — develops into serious moguls" }
        ]
      },
      {
        lift: "Crescent",
        liftInfo: "out-of-base lift — busy mornings, great for black mogul laps",
        trails: [
          { name: "Crescent", difficulty: "black", desc: "Very steep entrance", warning: "NOT intermediate level despite being an out-of-base run" },
          { name: "Silver Queen", difficulty: "blue", desc: "Blue groomer; popular so gets mogulled/icy by end of day" },
          { name: "Shaft", difficulty: "black", desc: "Old lift line, straight and narrow; short side-step discourages crowds — favorite run in pod" },
          { name: "Silver Skis / Silver King / Willy's", difficulty: "black", desc: "Rotating grooming, develop decent bumps between grooms" },
          { name: "Erika's Gold", difficulty: "black", desc: "Biggest and baddest moguls on this ridge" },
          { name: "Women's", difficulty: "blue", desc: "Blue only because it's mellower than neighbors; still fairly steep" },
          { name: "Gotcha Cutoff", difficulty: "blue", desc: "Winding road, best way to escape King Con choke point" }
        ]
      },
      {
        lift: "King Con",
        liftInfo: "can get busy but lines move fast",
        trails: [
          { name: "King Kong", difficulty: "black", desc: "Groomed nightly but one of steepest + busiest; try to avoid" },
          { name: "King Kong Ridge", difficulty: "blue", desc: "Groomed nightly" },
          { name: "Sitka", difficulty: "blue", desc: "Groomed nightly; favorite run in pod" },
          { name: "Temptation", difficulty: "blue", desc: "Groomed nightly" },
          { name: "Spyro / Sheamus", difficulty: "blue", desc: "Groomed fairly commonly" },
          { name: "Combustion", difficulty: "black", desc: "Well-developed mogul field; popular with people over their heads — skip if regular mogul skier" }
        ]
      },
      {
        lift: "Silverstar",
        liftInfo: "fixed grip, primarily real estate lift — short lines",
        trails: [
          { name: "Silverstar", difficulty: "blue", desc: "Great groomed lap, rarely busy" },
          { name: "Ligety Split", difficulty: "black", desc: "Standard mogul run" },
          { name: "Vista", difficulty: "black", desc: "Starts as meadow then mogul/trees; sun-exposed lower half, best as afternoon lap" }
        ]
      },
      {
        lift: "Bonanza",
        liftInfo: "access lift to rest of mountain — decent lines but manageable",
        trails: [
          { name: "Home Run", difficulty: "green", desc: "Primary green; initial section EXTREMELY busy — ski with extreme caution", warning: "Merging traffic is intense at the top" },
          { name: "Bonanza", difficulty: "green", desc: "Big wide mellow gully to the lift" },
          { name: "Jonesy's", difficulty: "blue", desc: "Fantastic cruiser, favorite in pod; touch steep on first pitch" },
          { name: "Mid Mountain", difficulty: "green", desc: "Tranquil winding forest road; good lower-level tree skiing nearby" },
          { name: "Muckers", difficulty: "blue", desc: "Great blue cruiser" },
          { name: "Mid Mountain Meadows", difficulty: "blue", desc: "Steeper than expected for a blue, can get icy" },
          { name: "Belmont", difficulty: "blue", desc: "Not often groomed" },
          { name: "Berg's Bowl", difficulty: "black", desc: "Short, steep, doesn't hold snow; don't recommend" },
          { name: "TNT", difficulty: "green", desc: "Favorite adventure zone; super long, winding, mostly empty", warning: "Lower section steeper than expected for such a narrow run" }
        ]
      },
      {
        lift: "Silverlode",
        liftInfo: "BY FAR worst crowds in all of Park City — AVOID when possible",
        trails: [
          { name: "Claim Jumper", difficulty: "green", desc: "Only real non-road green on main mountain; exceptionally popular — AVOID unless true beginner" },
          { name: "Parley's Park", difficulty: "blue", desc: "Main run leading to multiple options/forks" },
          { name: "Sunnyside", difficulty: "blue", desc: "Fantastic blue cruiser; only groomed every other night" },
          { name: "Carbide Cut", difficulty: "blue", desc: "Groomed nightly; last chance to access Motherlode — TAKE IT" },
          { name: "Motherlode Meadows", difficulty: "double-black", desc: "Deceptively mild start", warning: "Earns double black in super steep tight trees lower half — do NOT be fooled by the entrance" },
          { name: "Fools Gold / Glory Hole", difficulty: "black", desc: "Great black mogul runs" },
          { name: "Prospector", difficulty: "black", desc: "One of easiest blacks at PC (not steep), but busy and icy" },
          { name: "Mikey's", difficulty: "black", desc: "Groomed ~once a week" }
        ]
      },
      {
        lift: "Motherlode Express",
        liftInfo: "lines a fraction of Silverlode — ALWAYS choose this over Silverlode",
        trails: [
          { name: "TNT", difficulty: "green", desc: "Favorite adventure zone; super long, winding, mostly empty" }
        ]
      },
      {
        lift: "Thaynes",
        liftInfo: "fixed grip double — not as slow/long as you'd think",
        trails: [
          { name: "Things", difficulty: "black", desc: "One of best single black mogul runs on PC side" },
          { name: "Hoist", difficulty: "black", desc: "One of best single black mogul runs; less busy than Things — preferred" },
          { name: "Keystone", difficulty: "blue", desc: "Nice upper half, then becomes a flat road" },
          { name: "Double Jack", difficulty: "black", desc: "Often mogulled, gets occasional groom" }
        ]
      },
      {
        lift: "Pioneer",
        liftInfo: "underrated — best place to escape crowds on PC side",
        trails: [
          { name: "Blue Slip Bowl (main)", difficulty: "double-black", desc: "Steep mogulled face, not too technical" },
          { name: "Blue Slip Bowl (looker's right)", difficulty: "double-black", desc: "Via gate behind Summit House", warning: "Gnarly cliffs and rock bands" },
          { name: "Blue Slip Bowl (looker's left)", difficulty: "double-black", desc: "Extremely steep technical trees", warning: "HIDDEN CLIFFS under the lift" },
          { name: "Hawkeye + unnamed blues", difficulty: "blue", desc: "Some of quietest blue cruisers anywhere on PC side" },
          { name: "10th Mountain", difficulty: "black", desc: "Best single black tree skiing on Mountain Village side" },
          { name: "Woodside", difficulty: "green", desc: "Always groomed; feels odd as green since only accessible from blues" },
          { name: "Mid-Mountain Lodge", difficulty: "info", desc: "Best lunch spot on PC side; less crowded than Summit House or Miners Camp" }
        ]
      },
      {
        lift: "McConkey's",
        liftInfo: "fantastic panoramic views on clear days — all intermediates+ should visit once",
        trails: [
          { name: "Georgeanna", difficulty: "blue", desc: "Groomer with mix of road and traditional slope sections" },
          { name: "Tycoon", difficulty: "black", desc: "Sometimes groomed, only one truly steep pitch" },
          { name: "Sun Dog", difficulty: "black", desc: "Sometimes groomed, only one truly steep pitch" },
          { name: "McConkey's Bowl", difficulty: "double-black", desc: "Iconic, super steep bumped-up bowl", warning: "Expert only — insanely steep with huge moguls. Enter via Sun Dog for less steep start" },
          { name: "Molly's", difficulty: "double-black", desc: "Insanely steep tree skiing", warning: "Hidden drops at top. Tighter trees skier's right = less steep + better snow" },
          { name: "Black Forest", difficulty: "double-black", desc: "Similar to Molly's, less technical entrance" },
          { name: "Powder Monkey", difficulty: "black", desc: "Super fun gully; watch for hidden bumps; save for last run down" }
        ]
      },
      {
        lift: "Jupiter Lift",
        liftInfo: "most tucked-away lift at PC — no easy routes down",
        warning: "Do not ride this lift unless you are comfortable on black/double black terrain",
        trails: [
          { name: "Portuguese Gap", difficulty: "double-black", desc: "Favorite line in Jupiter; wider tree shoot; skier's right path preferred" },
          { name: "Indicator / Six Bells", difficulty: "double-black", desc: "Extremely narrow tree chutes", warning: "HARDEST lines in all of PC — unsigned; always ski with a partner" },
          { name: "War Zone", difficulty: "double-black", desc: "Drops and straight lines at top; no hike needed" },
          { name: "Silver Cliffs", difficulty: "double-black", desc: "Wider chute under namesake cliffs" },
          { name: "Rhino", difficulty: "double-black", desc: "Big spine; bowl left, trees right" },
          { name: "Main Bull", difficulty: "black", desc: "Easiest way down the lift" },
          { name: "Shadow Ridge", difficulty: "black", desc: "Standard bump run down ridge; cool hidden variations" },
          { name: "Fortune Teller", difficulty: "black", desc: "Cliffs/straight lines upper (avoidable); sun-blasted, doesn't hold snow" }
        ]
      },
      {
        lift: "Jupiter Peak Hike",
        liftInfo: "5-15 min hike from McConkey's top — expert only",
        trails: [
          { name: "P-Zone (5 min)", difficulty: "double-black", desc: "Big cornice → technical natural obstacles → traditional trees" },
          { name: "O-Zone (10 min)", difficulty: "double-black", desc: "Large cornice → large bowl area" },
          { name: "Summit Lines (15 min)", difficulty: "double-black", desc: "Prominent cliffs with chutes between" }
        ]
      },
      {
        lift: "Pine Cone Ridge",
        liftInfo: "hike access — most isolated terrain at any Vail resort",
        warning: "Only open a few weeks per season. Difficult patrol access.",
        trails: [
          { name: "Moon Runs", difficulty: "double-black", desc: "Best places for powder at PC" },
          { name: "Pine Cone", difficulty: "double-black", desc: "Accessible via main ridge from Moon runs" },
          { name: "Limelite", difficulty: "double-black", desc: "Lower half rarely open; may require flat traverse" }
        ]
      }
    ],
    canyons: [
      {
        lift: "Cabriolet",
        liftInfo: "open-air standing gondola — fastest-moving lines at PC",
        trails: [
          { name: "Village Access", difficulty: "info", desc: "Links parking/transit hub to Canyons Village" }
        ]
      },
      {
        lift: "Orange Bubble Express (OBX)",
        liftInfo: "has midstation + bubble covers — 5 min shorter lines than Red Pine",
        trails: [
          { name: "Lookout Ridge", difficulty: "blue", desc: "Personal favorite groomer in ALL of Park City; consistent fall line, long, normally empty" },
          { name: "Doc's Run", difficulty: "blue", desc: "Fantastic blue cruiser EXCEPT for one legitimately uphill section" },
          { name: "Links / Eagle", difficulty: "black", desc: "Decent terrain; well-shaded side with much better snow" },
          { name: "Silverado", difficulty: "black", desc: "Mogul gully, fills in nicely but sunbaked" },
          { name: "Willow Draw", difficulty: "blue", desc: "Flat route back to base; includes rope tow — ride gondola down instead" }
        ]
      },
      {
        lift: "Red Pine Gondola",
        liftInfo: "main base lift — most popular so longest lines",
        trails: [
          { name: "Red Pine Lodge", difficulty: "info", desc: "Busy lunch spot at top of gondola" }
        ]
      },
      {
        lift: "Sunrise Gondola",
        liftInfo: "new — likely shortest lines of all three base lifts",
        trails: [
          { name: "Sunrise access", difficulty: "info", desc: "Lines ~15 min peak, empties after 11:30" }
        ]
      },
      {
        lift: "Super Condor Express",
        liftInfo: "low capacity but tucked in corner — lines not too bad",
        trails: [
          { name: "Apex Ridge", difficulty: "blue", desc: "One of longest/straightest blue cruisers you'll find; slightly steep for a blue" },
          { name: "Boa", difficulty: "blue", desc: "Significantly milder than Apex; lower section gets flat" },
          { name: "Kanes Gully", difficulty: "double-black", desc: "Longest natural gully at PC", warning: "Steep, narrow spots; only ONE emergency exit halfway; once committed, no escape. Sketchy on hardpack" },
          { name: "Devil's Friend", difficulty: "double-black", desc: "Biggest moguls at Park City", warning: "Ultimate leg burner. Expert only" },
          { name: "Condor Woods", difficulty: "black", desc: "Standard steep glades; flows into Kanes Gully" },
          { name: "Thrasher", difficulty: "black", desc: "Much wider mogul face" },
          { name: "Appland / Kestrel", difficulty: "blue", desc: "Groomed every couple days; among best cruisers when fresh" }
        ]
      },
      {
        lift: "Sun Peak Express",
        liftInfo: "more transit lift than lapping lift",
        trails: [
          { name: "Echo + Flume", difficulty: "blue", desc: "Fantastic long blue cruiser combined; gets busy" },
          { name: "Eclipse", difficulty: "black", desc: "Not groomed every night but enough; must-hit when groomed" },
          { name: "Massacre", difficulty: "black", desc: "Straight, fairly steep mogul run; annoying flat runout" },
          { name: "Transitions", difficulty: "varies", desc: "Only terrain park on canyon side; long with good features" },
          { name: "Mainline", difficulty: "blue", desc: "Pretty flat then one final drop into Red Pine area; gets busy" }
        ]
      },
      {
        lift: "High Meadow",
        liftInfo: "ONLY greens in all of Canyons — gets some of longest lines",
        trails: [
          { name: "Mellow Moose", difficulty: "green", desc: "Super wide; fantastic beginner learning area" },
          { name: "Alleycat", difficulty: "green", desc: "Fun winding road through woods" },
          { name: "Bear Cat Track", difficulty: "green", desc: "Hidden alternative; watch for blacks flowing in from Saddleback" }
        ]
      },
      {
        lift: "Saddleback Express",
        liftInfo: "surprisingly quiet despite central location",
        trails: [
          { name: "Snow Dancer", difficulty: "blue", desc: "Easiest blue in ALL of Park City; go here first when stepping up from greens" },
          { name: "Pine Draw", difficulty: "blue", desc: "Best snow of the three; narrower, more consistent pitch" },
          { name: "The Aspens", difficulty: "black", desc: "BEST single black in pod; gorgeous aesthetic cruising through aspens" },
          { name: "Hurricane Alley", difficulty: "black", desc: "Mellow natural gully; wider — preferred over Tunnel of Fun" },
          { name: "Tunnel of Fun", difficulty: "black", desc: "Mellow natural gully; narrower, shorter, more popular" },
          { name: "Elk Ridge", difficulty: "black", desc: "Mogul run down ridge line" },
          { name: "Silverhorse", difficulty: "black", desc: "Mogul run under lift; optional fun tree gully off skier's right" },
          { name: "Ecstasy → Shadows", difficulty: "black", desc: "Looks like tree skiing but really big mogul face with tree patches" }
        ]
      },
      {
        lift: "Tombstone Express",
        liftInfo: "MAJOR choke point — the Silverlode of the canyon side",
        trails: [
          { name: "Sidewinder", difficulty: "black", desc: "Awesome steep cruiser with rotating grooming; fantastic laps, never crowded" },
          { name: "Cloud 9", difficulty: "black", desc: "Sister run to Sidewinder; rotating grooming, equally steep and fantastic" },
          { name: "Desuites", difficulty: "double-black", desc: "Super underrated; multiple hidden tree shoots; flowy, long, great snow" },
          { name: "Grande", difficulty: "double-black", desc: "Sparse trees", warning: "DECEPTIVE cliff band halfway down — don't be fooled by the easy-looking entrance" },
          { name: "Another World", difficulty: "blue", desc: "Classic blue cruiser; slightly steep first pitch; immensely popular — hit first thing AM" },
          { name: "Tranquility", difficulty: "black", desc: "Black only for one semi-steep pitch; true to name — more enjoyable than Another World" },
          { name: "Diamond Ridge", difficulty: "black", desc: "Would be blue except one steep pitch; great cardio run" },
          { name: "Escapade Woods", difficulty: "black", desc: "Nice glade into natural gully; can't exit until Tombstone Alley" },
          { name: "Chicane", difficulty: "blue", desc: "Worst run on canyon side — feels like skiing an interstate. AVOID" },
          { name: "Rips", difficulty: "blue", desc: "Cute groomer through the Colony; only take if heading to 9990" }
        ]
      },
      {
        lift: "9990 Express",
        liftInfo: "mostly double black mogul runs",
        trails: [
          { name: "94 Turns", difficulty: "double-black", desc: "Most iconic line; VW-sized moguls; MUST HIT for all experts" },
          { name: "Dutch Hollow", difficulty: "double-black", desc: "Mild ridge drops into super steep rocky face", warning: "Don't be fooled by the mellow start" },
          { name: "Fright Gully", difficulty: "double-black", desc: "Wide gully with huge moguls all the way down" },
          { name: "Marine / Aspen Grove", difficulty: "black", desc: "Single black difficulty; classic trees/moguls" },
          { name: "Talus Garden", difficulty: "black", desc: "Moguls → open meadow → narrow gully to Peak 5" }
        ]
      },
      {
        lift: "Peak 5",
        liftInfo: "expert terrain",
        trails: [
          { name: "The Abyss", difficulty: "double-black", desc: "Looks like standard trees from top", warning: "Develops into GNARLIEST terrain at PC — do NOT enter without cliff/chute preparation" },
          { name: "Mystic Pines", difficulty: "black", desc: "Really good tree skiing; much better than lower mountain options" },
          { name: "Colony blues", difficulty: "blue", desc: "Rotating grooming, super long through affluent neighborhood; quiet and fun" }
        ]
      },
      {
        lift: "Daybreak",
        liftInfo: "most underrated lift in Canyons — very quiet",
        trails: [
          { name: "Right-side blues", difficulty: "blue", desc: "Rotating grooming; typically at least one unbumed route" },
          { name: "Left-side blues", difficulty: "blue", desc: "More consistently groomed; among quietest terrain in Canyons" }
        ]
      },
      {
        lift: "Dreamscape",
        liftInfo: "fixed grip ~10 min ride — good terrain, annoying lift",
        trails: [
          { name: "Déjà Vu", difficulty: "blue", desc: "Fantastic blue mogul run; best blue moguls at PC" },
          { name: "Bliss", difficulty: "blue", desc: "Fantastic blue mogul run; somewhat hidden — favorite", warning: "Access via Déjà Vu, go under lift" },
          { name: "Snow Meadow", difficulty: "blue", desc: "Widest and mellowest blue mogul run" },
          { name: "Alpenglow", difficulty: "black", desc: "Ridge line, consistently groomed; gets narrow at bottom merge" },
          { name: "Daydream", difficulty: "blue", desc: "Fantastic blue mogul run but busiest — avoid" }
        ]
      },
      {
        lift: "Dreamcatcher",
        liftInfo: "fixed grip, 15+ min real ride — serves great terrain",
        trails: [
          { name: "Phantasm", difficulty: "black", desc: "Great long cruiser; rotating grooming; skis well days after groom" },
          { name: "Boogeyman", difficulty: "black", desc: "Groomed most frequently; steep cruiser" },
          { name: "Chimera", difficulty: "double-black", desc: "Under lift; keeps great snow (shaded)", warning: "Exceedingly steep — would be DOUBLE BLACK at most mountains. Harder than rated" },
          { name: "Specter / Fools Paradise", difficulty: "black", desc: "Several cut mogul lines + solid tree skiing; watch for thickets at bottom" },
          { name: "Shadowlands", difficulty: "double-black", desc: "Backside; precipitous face with tree patches", warning: "More double black than single — harder than rated" },
          { name: "Sandman", difficulty: "black", desc: "Backside — take left off Upper Trance (Trance gets flat beyond)" },
          { name: "Pipedream", difficulty: "black", desc: "Gets lots of sun/icy; only recommend day after grooming" }
        ]
      },
      {
        lift: "Iron Mountain",
        liftInfo: "typically quiet — most people use it just for Quicksilver access",
        trails: [
          { name: "Mercury", difficulty: "blue", desc: "Standard cruiser; nice, long, empty" },
          { name: "Heavy Metal", difficulty: "black", desc: "Commonly groomed; black only because of pitch" },
          { name: "Double Nickel", difficulty: "black", desc: "Not groomed nightly; great for practicing ungroomed" },
          { name: "Cobalt Woods / Platinum Woods", difficulty: "black", desc: "Low elevation, sparse coverage; better trees elsewhere" }
        ]
      },
      {
        lift: "Quicksilver Gondola",
        liftInfo: "connects PC ↔ Canyons — low capacity, busy on peak days",
        warning: "Pick one side per day on weekends. Or take free bus between bases.",
        trails: [
          { name: "Blaise's Way", difficulty: "blue", desc: "Great upper 2/3; gets flat at bottom" },
          { name: "Highway", difficulty: "blue", desc: "Great upper 2/3; flat at bottom" },
          { name: "Snowonder", difficulty: "blue", desc: "Nice continuous cruiser all the way down" },
          { name: "Mimi's Way", difficulty: "blue", desc: "Off Blaise's Way", warning: "DO NOT turn onto — dead-ends at wrong end of Flat Iron with NO signs" }
        ]
      }
    ]
  },

  // ============================================================
  // ROUTES TAB — turn-by-turn directions
  // ============================================================
  routes: {
    mountainVillage: [
      {
        id: 1,
        name: "Base → Upper Mountain",
        subtitle: "Recommended Morning Flow",
        steps: [
          { icon: "🅿️", instruction: "Arrive at Mountain Village", detail: "Take free bus (download Transit app) or park with 4+ carpool" },
          { icon: "➡️", instruction: "Walk past First Time lift to Eagle", detail: "Skip First Time — monstrous lines. Eagle is further but worth it" },
          { icon: "🚡", instruction: "Ride Eagle up", detail: "Fixed triple" },
          { icon: "⬅️", instruction: "At top, take Gotcha Cutoff left", detail: "Winding road — best escape route from this area" },
          { icon: "🚡", instruction: "Ride Payday up", detail: "Main out-of-base lift" },
          { icon: "➡️", instruction: "At top, take Bonanza Access right", detail: "Short and flat cat track" },
          { icon: "🚡", instruction: "Ride Bonanza up", detail: "Decent lines but moves well" },
          { icon: "⬅️", instruction: "At top, stay LEFT on Home Run", detail: "EXTREMELY busy initial section — ski with caution", warning: true },
          { icon: "➡️", instruction: "Fork right onto Carbide Cut", detail: "Groomed nightly — this is your key turn" },
          { icon: "🚡", instruction: "Ride Motherlode Express up", detail: "Lines a fraction of Silverlode. You are now on the mid-mountain.", success: true }
        ]
      },
      {
        id: 2,
        name: "Motherlode → Pioneer → McConkey's",
        subtitle: "Quiet Terrain",
        steps: [
          { icon: "🚡", instruction: "Start at top of Motherlode or Bonanza", detail: "" },
          { icon: "➡️", instruction: "Take Mid Mountain trail", detail: "Tranquil winding forest road" },
          { icon: "📍", instruction: "Pass Mid-Mountain Lodge on your left", detail: "Best lunch spot on PC side — less crowded", success: true },
          { icon: "🚡", instruction: "Ride Pioneer up", detail: "Most underrated lift — quiet cruisers", success: true },
          { icon: "➡️", instruction: "At top, ski Hawkeye or unnamed blues", detail: "Some of the quietest runs anywhere on PC side" },
          { icon: "🚡", instruction: "Walk slightly uphill to McConkey's 6-pack", detail: "Don't accidentally ski past it onto Pioneer" },
          { icon: "🚡", instruction: "Ride McConkey's up", detail: "Fantastic panoramic views on clear days" },
          { icon: "🎿", instruction: "Ski Georgeanna (blue) or Tycoon (black)", detail: "Step up difficulty as desired" }
        ]
      },
      {
        id: 3,
        name: "McConkey's → Jupiter",
        subtitle: "Expert Only",
        steps: [
          { icon: "🚡", instruction: "Ride McConkey's 6-pack to top", detail: "" },
          { icon: "➡️", instruction: "Exit through gate adjacent to top terminal", detail: "Signed for Jupiter Peak hike" },
          { icon: "🥾", instruction: "Hike 5 min (P-Zone), 10 min (O-Zone), 15 min (summit)", detail: "Expert terrain only beyond this point", warning: true },
          { icon: "🎿", instruction: "Descend chosen line back to McConkey's", detail: "Or continue to Jupiter Lift side" },
          { icon: "🚡", instruction: "Ride Jupiter Lift up", detail: "No easy way down — all black/double black", warning: true },
          { icon: "⬅️", instruction: "Portuguese Gap: signed entry on RIGHT shortly after unloading", detail: "Favorite line — take skier's right path" },
          { icon: "⬅️", instruction: "Indicator/Six Bells: follow traverse tracks LEFT", detail: "Hardest lines at PC — always ski with partner", warning: true },
          { icon: "➡️", instruction: "Main Bull (easiest way down): head straight", detail: "Standard bump run" },
          { icon: "🔄", instruction: "Exit via upper Thaynes Canyon", detail: "Back to Jupiter or Motherlode" }
        ]
      },
      {
        id: 4,
        name: "Avoiding Silverlode",
        subtitle: "Critical Detour",
        steps: [
          { icon: "📍", instruction: "You're at Bonanza top or King Con top", detail: "" },
          { icon: "❌", instruction: "Do NOT follow crowds toward Silverlode", detail: "Worst crowds in all of Park City", warning: true },
          { icon: "✅", instruction: "From Bonanza: take Parley's Park", detail: "Main run with multiple forks", success: true },
          { icon: "⬅️", instruction: "At first fork, go LEFT onto Sunnyside", detail: "Fantastic blue cruiser (groomed every other night)" },
          { icon: "⬅️", instruction: "At lower fork, go LEFT onto Carbide Cut", detail: "Groomed nightly — LAST chance to escape to Motherlode" },
          { icon: "🚡", instruction: "Ride Motherlode Express", detail: "Fraction of Silverlode's lines", success: true },
          { icon: "📍", instruction: "If you miss Carbide Cut:", detail: "You end up at King Con via Thaynes Canyon — long way around" }
        ]
      },
      {
        id: 5,
        name: "Returning to Base",
        subtitle: "End of Day",
        steps: [
          { icon: "📍", instruction: "Get to top of Crescent or Payday", detail: "Via any upper lift" },
          { icon: "🎿", instruction: "Option A: Payday → Home Run → base", detail: "Wide, straightforward; narrows at corners" },
          { icon: "🌟", instruction: "Option B: Payday → Drift → Creole → downtown", detail: "Scenic bridge into town — do at least once" },
          { icon: "🎿", instruction: "Option C: King Con → Gotcha Cutoff → base", detail: "Avoids the Crescent/Silverlode choke point" },
          { icon: "❌", instruction: "Avoid taking Drift back to base", detail: "Narrow and very busy" }
        ]
      }
    ],
    canyons: [
      {
        id: 6,
        name: "Base → Upper Canyons",
        subtitle: "Recommended Morning Flow",
        steps: [
          { icon: "🅿️", instruction: "Arrive at Canyons Village", detail: "Free High Valley Transit bus or paid parking" },
          { icon: "🚡", instruction: "Ride Cabriolet up to village", detail: "Open-air standing gondola — fastest-moving lines" },
          { icon: "➡️", instruction: "Walk to far end of beach area to OBX", detail: "Best base lift — ~5 min shorter lines than Red Pine", success: true },
          { icon: "🚡", instruction: "Ride OBX to top (skip midstation)", detail: "Pull down bubble cover on stormy days" },
          { icon: "➡️", instruction: "At top, head to Lookout Cabin area", detail: "Full-service restaurant with fondue" },
          { icon: "⬅️", instruction: "Take Arrowhead", detail: "Fastest route to Super Condor" },
          { icon: "🚡", instruction: "Ride Super Condor Express up", detail: "Tucked in corner — lines not too bad" },
          { icon: "🎿", instruction: "Lap Apex Ridge (long blue cruiser)", detail: "Slightly steep for blue — scope from lift first" },
          { icon: "⚠️", instruction: "When done with Condor, exit ALL AT ONCE", detail: "Easy Street and Willow Draw are painfully flat", warning: true }
        ]
      },
      {
        id: 7,
        name: "Condor → Tombstone → Southern Terrain",
        subtitle: "Main Progression",
        steps: [
          { icon: "📍", instruction: "From OBX top or Sun Peak", detail: "" },
          { icon: "➡️", instruction: "Head toward Red Pine Lodge area", detail: "Via Mainline (gets busy) or Boomer/Broken Arrow" },
          { icon: "➡️", instruction: "Take Chicane Bypass / Tombstone Alley", detail: "Do NOT take Chicane itself — worst run on canyon side", warning: true },
          { icon: "🚡", instruction: "Ride Tombstone Express up", detail: "Major choke point — expect lines", warning: true },
          { icon: "➡️", instruction: "At top, take Silver Spur right", detail: "Decently pitched road" },
          { icon: "🚡", instruction: "Ride Peak 5 up", detail: "Or continue to 9990 — know which you want first" },
          { icon: "➡️", instruction: "From Peak 5, take Upper Harmony / Solace / Royal", detail: "Access to southern lifts" },
          { icon: "🚡", instruction: "Ride Dreamscape or head to Daybreak", detail: "Daybreak = quietest blues; Dreamscape = best blue moguls" }
        ]
      },
      {
        id: 8,
        name: "Bypassing Tombstone",
        subtitle: "When Lines Are Bad",
        steps: [
          { icon: "📍", instruction: "From any base lift or Red Pine Lodge", detail: "" },
          { icon: "❌", instruction: "Skip Tombstone entirely", detail: "" },
          { icon: "➡️", instruction: "Head to Timberline lift", detail: "Via Chicane Bypass or from Dreamcatcher bottom" },
          { icon: "🚡", instruction: "Ride Timberline (2-way lift)", detail: "Watch for unloading traffic" },
          { icon: "➡️", instruction: "At top, head to Iron Mountain", detail: "" },
          { icon: "🚡", instruction: "Ride Iron Mountain up", detail: "Typically quiet; orange-themed lift" },
          { icon: "➡️", instruction: "From top, access Quicksilver Gondola", detail: "Or ski Iron Mountain terrain (Mercury is nice and empty)" },
          { icon: "➡️", instruction: "Or take Cascade trail to Dreamcatcher", detail: "Access southern terrain without touching Tombstone" }
        ]
      },
      {
        id: 9,
        name: "Dreamscape → Dreamcatcher → Backside",
        subtitle: "Advanced",
        steps: [
          { icon: "🚡", instruction: "Ride Dreamscape to top", detail: "Fixed grip — ~10 min ride" },
          { icon: "⬅️", instruction: "Take Alpenglow down the ridge", detail: "Consistently groomed; gets narrow at bottom merge" },
          { icon: "⬅️", instruction: "Turn onto Déjà Vu for blue moguls", detail: "Or access Bliss (hidden — go under lift via Déjà Vu)" },
          { icon: "🚡", instruction: "Back up Dreamscape", detail: "" },
          { icon: "⬅️", instruction: "Take Alpenglow → Twilight or Mirage", detail: "Blue groomers to Dreamcatcher" },
          { icon: "🚡", instruction: "Ride Dreamcatcher up", detail: "15+ min ride with constant stops", warning: true },
          { icon: "🎿", instruction: "Ski Phantasm or Boogeyman", detail: "Skip Pipedream unless groomed overnight — icy" },
          { icon: "➡️", instruction: "For backside: Take Upper Trance from summit", detail: "Moderately pitched road" },
          { icon: "⬅️", instruction: "Turn LEFT onto Sandman", detail: "Do this — Trance gets flat beyond this point", success: true },
          { icon: "🚡", instruction: "At bottom, ride Flat Iron Double back", detail: "Uncomfortable seats but short ride" }
        ]
      },
      {
        id: 10,
        name: "Canyons → Park City Side",
        subtitle: "Cross-Mountain",
        steps: [
          { icon: "📍", instruction: "From any Canyons base lift", detail: "" },
          { icon: "➡️", instruction: "Head to Timberline", detail: "Via Chicane Bypass from Red Pine Lodge" },
          { icon: "🚡", instruction: "Ride Timberline up", detail: "" },
          { icon: "➡️", instruction: "Head to Iron Mountain", detail: "" },
          { icon: "🚡", instruction: "Ride Iron Mountain up", detail: "This is the fastest route to PC side", success: true },
          { icon: "➡️", instruction: "At top, access Quicksilver Gondola", detail: "" },
          { icon: "🚡", instruction: "Ride Quicksilver full length to Park City side", detail: "Low capacity — can be busy on peak days", warning: true },
          { icon: "📍", instruction: "You arrive at Tombstone area (PC side)", detail: "Take Thaynes Canyon down to Motherlode or King Con" },
          { icon: "🚌", instruction: "Alternative: Free High Valley Transit bus", detail: "Often faster than skiing across on busy days" }
        ]
      },
      {
        id: 11,
        name: "Returning to Canyons Base",
        subtitle: "End of Day",
        steps: [
          { icon: "🚡", instruction: "Option A: Download Red Pine or Sunrise Gondola", detail: "Recommended for beginners — no shame riding down" },
          { icon: "📍", instruction: "Option B: Get to bottom of Tombstone", detail: "Recommended for intermediates+" },
          { icon: "🚡", instruction: "Ride Over and Out up", detail: "Best ski-down option", success: true },
          { icon: "➡️", instruction: "Take Raptor Way → Retreat → Sunrise → Doc's Run", detail: "Opens up into wider, nicer cruisers" },
          { icon: "⚠️", instruction: "Low elevation runs get icy late in day", detail: "Ski with caution", warning: true },
          { icon: "❌", instruction: "Avoid Willow Draw", detail: "Flat with a rope tow — ride the gondola instead" }
        ]
      }
    ]
  },

  // ============================================================
  // STRATEGY TAB — lift path recommendations
  // ============================================================
  strategy: {
    mountainVillage: {
      morningStart: [
        { text: "Skip First Time — monstrous lines. Head to Eagle instead, then pop over to King Con or take Gotcha Cutoff to the main lifts.", type: "tip" },
        { text: "On busier days, take a bus into town and ride Town Lift up — often bypasses longer base area lines.", type: "tip" },
        { text: "Payday and Crescent are the main out-of-base lifts; they get similar lines, so default to Payday unless you want the canyon side quickly (then use Crescent).", type: "tip" }
      ],
      recommendedFlow: [
        { text: "Payday → Bonanza Access (short & flat) → Bonanza lift", type: "step" },
        { text: "Bonanza → fork: RIGHT to Silverlode area (avoid!) — take Carbide Cut to Motherlode Express instead (fraction of the lines). LEFT to Pioneer pod — most underrated area, quietest blue cruisers, best lunch at Mid-Mountain Lodge.", type: "step" },
        { text: "From Pioneer → McConkey's six-pack for panoramic views and advanced terrain", type: "step" },
        { text: "From McConkey's → hike to Jupiter Peak (5-15 min) or take Jupiter Access trail to Jupiter Lift for best expert terrain on PC side", type: "step" }
      ],
      warnings: [
        { text: "McConkey's Bowl, Molly's, Black Forest — Expert only. Insanely steep; huge moguls and tight trees with hidden drops." },
        { text: "Jupiter Lift — No easy routes down. Do not ride unless comfortable on black/double black terrain." },
        { text: "Indicator / Six Bells — Hardest lines at PC. Extremely narrow tree chutes. Always ski with a partner." },
        { text: "Pine Cone Ridge — Remote backcountry-esque terrain. Difficult patrol access. Only open a few weeks per season." }
      ],
      routingTips: [
        { text: "From King Con, take the Crescent runs to exit — NOT Silverlode. This avoids a major choke point.", type: "tip" },
        { text: "Use Gotcha Cutoff (from below Crescent) as the best escape from King Con back to base.", type: "tip" },
        { text: "TNT adventure zone (accessed via Parley's Park) is a hidden gem — super long, usually empty.", type: "tip", warning: "Lower section is steeper than expected for such a narrow run." },
        { text: "Thaynes pod is accessible from Motherlode or Single Jack — the fixed grip double isn't as bad as you'd think.", type: "tip", warning: "Motherlode Meadows — Deceptively mild start. Earns double black in lower half. Do not be fooled." },
        { text: "Pine Cone Ridge (hike from Jupiter) is the most isolated terrain at any Vail resort — worth doing once, but only open a few weeks per season.", type: "tip" }
      ]
    },
    canyons: {
      morningStart: [
        { text: "Orange Bubble Express (OBX) is the best base lift choice — lines move faster and are ~5 min shorter than Red Pine Gondola.", type: "tip" },
        { text: "Sunrise Gondola (new, tucked away) will likely have the shortest lines of all three.", type: "tip" },
        { text: "All three base lifts empty out by ~11:30, so don't stress if you're a late starter.", type: "tip" }
      ],
      recommendedFlow: [
        { text: "OBX → top out at Lookout Cabin area. Lap Lookout Ridge (favorite groomer in all of PC) or head to Super Condor. Take Arrowhead for fastest access.", type: "step" },
        { text: "Super Condor → lap Apex Ridge (one of longest blues anywhere) or Kanes Gully / Devil's Friend for expert moguls. Don't lap Condor in spurts — exits are painfully flat.", type: "step" },
        { text: "To reach southern terrain: Tombstone is the gateway but a major choke point. Alt route: Timberline → Iron Mountain to bypass Tombstone lines.", type: "step" },
        { text: "From Tombstone → Peak 5 → Dreamscape area. Daybreak is most underrated lift. Dreamscape has best blue mogul runs (especially Bliss, which is hidden).", type: "step" },
        { text: "For experts: 9990 for 94 Turns (must-hit VW-sized moguls) and Peak 5 for The Abyss (gnarliest terrain at PC).", type: "step" }
      ],
      warnings: [
        { text: "Kanes Gully — Longest natural gully at PC. Steep, narrows in spots, only one emergency exit halfway. Sketchy on hardpack." },
        { text: "Devil's Friend — Biggest moguls at Park City. True leg burner. Expert only." },
        { text: "The Abyss — Looks like standard trees but develops into gnarly chutes. Do NOT enter without cliff/chute preparation." },
        { text: "94 Turns / Dutch Hollow / Fright Gully — Volkswagen-sized moguls and super steep faces. Expert only." },
        { text: "Grande — Deceptive cliff band halfway down. Don't let the sparse trees at the top fool you." }
      ],
      routingTips: [
        { text: "Avoid Chicane at all costs — worst run on canyon side. Use Sidewinder or Cloud 9 instead for lapping Tombstone.", type: "tip" },
        { text: "Another World is immensely popular — hit it first thing AM or skip it for Tranquility (more enjoyable, less crowded).", type: "tip" },
        { text: "To get back to base: ride a gondola down if beginner. Otherwise take Over and Out from Tombstone bottom — better than Willow Draw.", type: "tip" },
        { text: "Quicksilver Gondola (PC ↔ Canyons): on weekends, pick ONE side for the whole day. Fastest route: base lifts → Timberline → Iron Mountain → Quicksilver.", type: "tip" },
        { text: "Mimi's Way off Blaise's Way is a trap — dead-ends at wrong side of Flat Iron with NO signs.", type: "tip", warning: "Do NOT turn onto Mimi's Way." },
        { text: "Chimera (Dreamcatcher) — Rated single black but exceedingly steep; would be double black at most mountains.", type: "tip" }
      ]
    }
  },

  // ============================================================
  // TREES TAB — best and worst tree runs
  // ============================================================
  trees: {
    best: {
      mountainVillage: [
        { name: "10th Mountain", difficulty: "black", lift: "Pioneer", location: "Pioneer pod", notes: "Best single black tree skiing on Mountain Village side" },
        { name: "Molly's", difficulty: "double-black", lift: "McConkey's", location: "McConkey's", notes: "Insanely steep; tighter trees skier's right = less steep + better snow; hidden drops at top", warning: true },
        { name: "Black Forest", difficulty: "double-black", lift: "McConkey's", location: "McConkey's", notes: "Similar to Molly's but less technical entrance" },
        { name: "Indicator / Six Bells", difficulty: "double-black", lift: "Jupiter", location: "Jupiter pod", notes: "Extremely narrow tree-defined chutes; HARDEST lines in all of PC; always ski with partner", warning: true },
        { name: "Portuguese Gap", difficulty: "double-black", lift: "Jupiter", location: "Jupiter pod", notes: "Wider tree shoot; favorite line in Jupiter; skier's right path preferred" },
        { name: "Dividend / Widowmaker trees", difficulty: "black", lift: "Payday", location: "Payday pod", notes: "Solid advanced tree skiing between the two runs when conditions allow" },
        { name: "Mid Mountain area", difficulty: "blue", lift: "Bonanza", location: "Bonanza pod", notes: "Good lower-level tree skiing in and around Mid Mountain trail" },
        { name: "Blue Slip Bowl (looker's left)", difficulty: "double-black", lift: "Pioneer", location: "Pioneer pod", notes: "Extremely steep and technical trees with HIDDEN CLIFFS under the lift", warning: true },
        { name: "Pine Cone Ridge", difficulty: "double-black", lift: "Hike from Jupiter/Quicksilver", location: "Pine Cone Ridge", notes: "Most isolated backcountry-esque terrain at any Vail resort; open a few weeks per season" },
        { name: "Moon Runs", difficulty: "double-black", lift: "Hike from Jupiter", location: "Pine Cone Ridge", notes: "Best places to find powder at PC" }
      ],
      canyons: [
        { name: "Desuites", difficulty: "double-black", lift: "Tombstone Express", location: "Tombstone pod", notes: "Super underrated; multiple hidden tree shoots; flowy, long, keeps great snow" },
        { name: "The Aspens", difficulty: "black", lift: "Saddleback Express", location: "Saddleback pod", notes: "Best single black in pod; gorgeous aesthetic cruising through aspens" },
        { name: "Escapade Woods", difficulty: "black", lift: "Tombstone Express", location: "Tombstone pod", notes: "Nice glade into natural gully; commit to full vertical — can't exit until Tombstone Alley" },
        { name: "Chimera trees", difficulty: "double-black", lift: "Dreamcatcher", location: "Dreamcatcher pod", notes: "Expert-only; exceedingly steep; shaded = great snow", warning: true },
        { name: "Specter / Fools Paradise", difficulty: "black", lift: "Dreamcatcher", location: "Dreamcatcher pod", notes: "Several cut lines with solid tree skiing; watch for thickets at bottom" },
        { name: "Condor Woods", difficulty: "black", lift: "Super Condor Express", location: "Super Condor pod", notes: "Standard steep glades; flows into Kanes Gully" },
        { name: "The Abyss (skier's right)", difficulty: "double-black", lift: "Peak 5", location: "Peak 5 pod", notes: "Do NOT enter without cliff/chute preparation — trees can funnel into gnarly chutes", warning: true },
        { name: "Mystic Pines", difficulty: "black", lift: "Peak 5", location: "Peak 5 pod", notes: "Really good tree skiing; much better than lower mountain options" },
        { name: "Links / Eagle trees", difficulty: "black", lift: "Orange Bubble Express", location: "OBX pod", notes: "Well-shaded side with much better snow than opposing face" }
      ]
    },
    avoid: [
      { name: "Cobalt Woods / Platinum Woods", lift: "Iron Mountain", location: "Iron Mountain pod", why: "Low elevation = sparse coverage; better trees elsewhere" },
      { name: "Black Hole", lift: "Orange Bubble Express", location: "OBX/Sun Peak area", why: "Decent skiing but better options elsewhere; annoying flat runout" },
      { name: "Condor Woods (hard pack)", lift: "Super Condor Express", location: "Super Condor pod", why: "Flows into Kanes Gully which gets narrow/steep — sketchy on hard pack" },
      { name: "South-facing Condor ridge", lift: "Super Condor Express", location: "Super Condor pod", why: "Face straight south; don't hold snow; only good a few days per season" },
      { name: "Silver Streak", lift: "Iron Mountain", location: "Iron Mountain pod", why: "Bottom half sun-exposed; closed often, poor coverage" },
      { name: "Thunder / Lightning", lift: "Tombstone Express", location: "Tombstone pod", why: "Tons of sun; only worth it when conditions are specifically good" },
      { name: "Silverado Bowl trees", lift: "Orange Bubble Express", location: "OBX pod", why: "Gets absolutely blasted by sun; coverage issues" },
      { name: "Lower mountain PC side", lift: "Various", location: "Various", why: "The lower part of Mountain Village doesn't have much decent tree skiing overall" }
    ]
  },

  // ============================================================
  // MAPS TAB — lift flow graph data (CSS node trees)
  // ============================================================
  maps: {
    mountainVillage: {
      title: "Mountain Village Side — Lift Flow",
      nodes: [
        { id: "town-lift", name: "Town Lift", info: "Fixed triple — long ride, no lines", type: "standard", zone: "base" },
        { id: "first-time", name: "First Time", info: "Detachable — monstrous lines", type: "avoid", zone: "base" },
        { id: "eagle", name: "Eagle", info: "Triple — recommended start", type: "recommended", zone: "base" },
        { id: "payday", name: "Payday", info: "Main out-of-base", type: "standard", zone: "base" },
        { id: "crescent", name: "Crescent", info: "Out-of-base — black moguls", type: "standard", zone: "base" },
        { id: "three-kings", name: "3 Kings", info: "Triple — terrain parks", type: "standard", zone: "base" },
        { id: "king-con", name: "King Con", info: "Lines move fast", type: "standard", zone: "lower" },
        { id: "silverstar", name: "Silverstar", info: "Real estate lift — empty", type: "standard", zone: "lower" },
        { id: "bonanza", name: "Bonanza", info: "Access lift — decent lines", type: "standard", zone: "mid" },
        { id: "silver-load", name: "Silverlode", info: "WORST crowds — AVOID", type: "avoid", zone: "mid" },
        { id: "motherload", name: "Motherlode Express", info: "Fraction of Silverlode lines", type: "recommended", zone: "mid" },
        { id: "thaynes", name: "Thaynes", info: "Fixed double — not bad", type: "standard", zone: "mid" },
        { id: "pioneer", name: "Pioneer", info: "Most underrated — quiet", type: "recommended", zone: "upper" },
        { id: "mcconkeys", name: "McConkey's 6-Pack", info: "Panoramic views", type: "standard", zone: "upper" },
        { id: "jupiter", name: "Jupiter Lift", info: "No easy way down", type: "expert", zone: "expert" },
        { id: "jupiter-hike", name: "Jupiter Peak Hike", info: "5-15 min hike", type: "expert", zone: "expert" },
        { id: "pine-cone", name: "Pine Cone Ridge", info: "Open few weeks/season", type: "expert", zone: "expert" }
      ],
      connections: [
        { from: "eagle", to: "king-con", label: "Gotcha Cutoff ✅" },
        { from: "payday", to: "bonanza", label: "Bonanza Access" },
        { from: "crescent", to: "king-con", label: "Gotcha Cutoff" },
        { from: "bonanza", to: "motherload", label: "Carbide Cut ✅", highlight: true },
        { from: "bonanza", to: "silver-load", label: "Home Run ⚠️" },
        { from: "bonanza", to: "pioneer", label: "Mid Mountain" },
        { from: "silver-load", to: "motherload", label: "Parley's Park" },
        { from: "silver-load", to: "thaynes", label: "SingleJack" },
        { from: "motherload", to: "king-con", label: "Thaynes Canyon" },
        { from: "thaynes", to: "jupiter", label: "Jupiter Access" },
        { from: "pioneer", to: "mcconkeys", label: "McConkey's access" },
        { from: "mcconkeys", to: "jupiter-hike", label: "Gate + hike" },
        { from: "jupiter-hike", to: "jupiter", label: "Jupiter Access" },
        { from: "jupiter", to: "pine-cone", label: "Scotsbull ridge" }
      ]
    },
    canyons: {
      title: "Canyons Side — Lift Flow",
      nodes: [
        { id: "cabriolet", name: "Cabriolet", info: "Standing gondola — fastest lines", type: "standard", zone: "base" },
        { id: "obx", name: "Orange Bubble Express", info: "Best base lift choice", type: "recommended", zone: "base" },
        { id: "red-pine", name: "Red Pine Gondola", info: "Most popular — longest lines", type: "standard", zone: "base" },
        { id: "sunrise", name: "Sunrise Gondola", info: "New — likely shortest lines", type: "recommended", zone: "base" },
        { id: "shortcut", name: "Shortcut Triple", info: "Weekends/holidays only", type: "standard", zone: "lower" },
        { id: "high-meadow", name: "High Meadow", info: "Only greens — longest lines", type: "avoid", zone: "lower" },
        { id: "saddleback", name: "Saddleback Express", info: "Surprisingly quiet", type: "standard", zone: "lower" },
        { id: "sun-peak", name: "Sun Peak Express", info: "Transit lift", type: "standard", zone: "mid" },
        { id: "condor", name: "Super Condor Express", info: "Tucked — not bad", type: "standard", zone: "mid" },
        { id: "tombstone", name: "Tombstone Express", info: "MAJOR choke point", type: "avoid", zone: "central" },
        { id: "over-and-out", name: "Over and Out", info: "Best base return", type: "recommended", zone: "central" },
        { id: "timberline", name: "Timberline", info: "2-way lift", type: "standard", zone: "south" },
        { id: "iron-mountain", name: "Iron Mountain", info: "Quiet — orange themed", type: "standard", zone: "south" },
        { id: "peak-5", name: "Peak 5", info: "Expert terrain", type: "expert", zone: "south" },
        { id: "9990", name: "9990 Express", info: "Mostly double black", type: "expert", zone: "south" },
        { id: "daybreak", name: "Daybreak", info: "Most underrated — quiet", type: "recommended", zone: "far-south" },
        { id: "dreamscape", name: "Dreamscape", info: "Fixed grip ~10 min", type: "standard", zone: "far-south" },
        { id: "dreamcatcher", name: "Dreamcatcher", info: "15+ min ride — great terrain", type: "expert", zone: "far-south" },
        { id: "flat-iron", name: "Flat Iron Double", info: "Short ride", type: "standard", zone: "far-south" },
        { id: "quicksilver", name: "Quicksilver Gondola", info: "PC ↔ Canyons", type: "cross-mountain", zone: "cross" }
      ],
      connections: [
        { from: "cabriolet", to: "obx", label: "Village" },
        { from: "cabriolet", to: "red-pine", label: "Village" },
        { from: "obx", to: "condor", label: "Arrowhead ✅", highlight: true },
        { from: "obx", to: "sun-peak", label: "Doc's Run" },
        { from: "red-pine", to: "sun-peak", label: "Mainline" },
        { from: "red-pine", to: "high-meadow", label: "High Meadow" },
        { from: "high-meadow", to: "saddleback", label: "Badger's Bypass" },
        { from: "sun-peak", to: "condor", label: "Echo + Flume" },
        { from: "condor", to: "sun-peak", label: "Easy Street ⚠️" },
        { from: "tombstone", to: "peak-5", label: "Silver Spur" },
        { from: "tombstone", to: "9990", label: "Silver Spur" },
        { from: "tombstone", to: "over-and-out", label: "Another World" },
        { from: "over-and-out", to: "cabriolet", label: "Doc's Run → base" },
        { from: "tombstone", to: "timberline", label: "Tombstone area" },
        { from: "timberline", to: "iron-mountain", label: "Bypass ✅", highlight: true },
        { from: "iron-mountain", to: "quicksilver", label: "To QS" },
        { from: "iron-mountain", to: "dreamcatcher", label: "Cascade trail" },
        { from: "peak-5", to: "daybreak", label: "Upper Harmony" },
        { from: "peak-5", to: "dreamscape", label: "Upper Harmony" },
        { from: "dreamscape", to: "dreamcatcher", label: "Alpenglow" },
        { from: "dreamscape", to: "daybreak", label: "Blues" },
        { from: "dreamcatcher", to: "flat-iron", label: "Upper Trance" },
        { from: "flat-iron", to: "quicksilver", label: "End of lift" }
      ]
    },
    crossMountain: {
      title: "Cross-Mountain Connections",
      routes: [
        { name: "Fastest Ski Route", steps: "Canyons base → Timberline → Iron Mountain → Quicksilver → PC side (Tombstone area)", type: "recommended" },
        { name: "Midstation Route", steps: "Quicksilver midstation → Blaise's Way / Highway (blue cruisers) → Dreamcatcher", type: "standard" },
        { name: "Pine Cone Ridge", steps: "Jupiter (PC side) → Scotsbull → hike → Limelite access → Quicksilver midstation", type: "expert" },
        { name: "Free Bus", steps: "Mountain Village base ↔ Canyons Village base via High Valley Transit", type: "recommended" }
      ]
    }
  }
};
