@props(['url'=>$url, 'method'=>$method,'description'=>$description, 'title'=> $title, 'requestData'=>$requestData])


<div class="mb-3 bg-white shadow-md p-4">
    @php
        $color="";
        if($method=="POST"){
            $color = 'orange';
        }elseif ($method=="GET") {
            $color = 'green';
        }elseif ($method=="DELETE") {
            $color = 'rose';
        }elseif ($method=="PUT") {
            $color = 'blue';
        }elseif ($method=="PATCH") {
            $color = 'purple';
        }
    @endphp

    <p class="bg-{{$color}}-500 text-white font-semibold text-[10px] py-1 px-2 rounded-sm w-fit">{{$method}}</p>
    <p class="font-semibold my-1"  >{{$title}}</p>
    <p class="font-semibold mb-1 ">{baseURL}/api/{{$url}}</p>
    <p class="text-sm">{{$description}}</p>

    @if($method != 'GET' && $requestData != "")
    <div class="flex flex-col items-start mt-1">
        <p class="text-sm">Expected request data:</p>
        <code class="py-2">
            {{$requestData}}
        </code> 
    </div>
       
        
   @endif

</div>


<script>
    console.log("Hello")
</script>