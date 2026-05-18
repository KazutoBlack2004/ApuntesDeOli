import React from "react";
import NoteLayout from "../NoteLayout.jsx";

/**
 * TiposDeIP.jsx
 * ─────────────
 * Apunte sobre tipos de direcciones IP.
 * Edita las secciones de abajo para agregar tu contenido.
 * Puedes usar:
 *   <h2>Título de sección</h2>
 *   <h3>Subtítulo</h3>
 *   <p>Párrafo</p>
 *   <ul><li>Item</li></ul>
 *   <code>código inline</code>
 *   <pre><code>bloque de código</code></pre>
 *   <table>...</table>
 *   <div className="callout">Nota destacada</div>
 */
export default function TiposDeIP() {
  return (
    <NoteLayout
      title="Tipos de Direcciones IP"
      category="Redes"
      categoryPath="/Redes"
      tags={["IPv4", "IPv6", "Networking", "Protocolos"]}
      nextNote={{
        label: "Máscara de red y gateway",
        path: "/Redes/MascaraGateway",
      }}
    >

      {/* ── TU CONTENIDO AQUÍ ─────────────────────────────── */}

      <div className="callout">
        Para entender una dirección IP, primero conviene tener claro qué es un
        bit y qué es un octeto. Esos conceptos son la base para comprender cómo
        se construye una dirección IPv4.
      </div>

      <h2>Conceptos básicos</h2>

      <h3>Bit</h3>
      <p>
        En una red, un bit puede representar la transmisión o recepción de un
        paquete de datos.
        <strong>bit</strong> es la unidad mínima de información en
        computación. Puede tener solo dos valores: <code>0</code> o{" "}
        <code>1</code>. Lo cual se puede traducir como encendido o apagado, o
        en algunos casos como verdadero o falso, o cualquier otro valor que se
        pueda representar con dos estados. Esto es asi por el flujo de corriente
        electrica que se traduce como si de un lenguaje se tratara permitiendo 
        a sistemas computacionales comunicarce o realizar tareas.
      </p>

      <h3>Octeto</h3>
      <p>
        Un <strong>octeto</strong> es un conjunto de 8 bits. En una dirección
        IPv4, cada número separado por puntos representa un octeto.
      </p>
      <img className="mx-auto block max-w-full"
      src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAYoAAACACAMAAAAiTN7wAAAAw1BMVEX/////AAD/9vb/lZX/QED/fn7/Rkb/qqr/2Nj/6ur/yMj/aGj/iYn/Gxv/h4f/ERH/XFz/dnb/ubn/9PT/3d3z8/P5+fnd3d3/4+P/z8//7+//Skrl5eX/vr7/0tL/oaFkZGT/YmJPT09ubm6enp7/NDT/LCz/l5f/srKwsLCMjIzX19daWlqmpqa6urrs7Oz/b294eHjKysqSkpL/JSX/OjpERESCgoIAAAAuLi7BwcH/UVFJSUkVFRUeHh4oKCg6OjoZeMNGAAAPuUlEQVR4nO1diVbiShMuEBFQZJEkCAFjEpAlECEIV3Tu+P5P9XfT3Vk7i3MnkJm/v+NRSHqtr7qqekkEEPgrMd+iX9IRQMbf1DUoSzuaSlqDo6K/9hEOoOIssHCTrZdeaZy8AhmxWKNftgNb/Bc2ytJYfEqRVCiBhalQTfiE5Qpf0lV209y66ZRF3u39i+E4m4MkrWTr00TfdHxpg8eI41hIwqaFrq6srbQCzdRWYM9REnsNW23xaSuaoYB00IwtrA0Hf7JhH6VRICOcjbw6qDqsTWShVKzUsoWtzD9L+1/JceTDStnLMkqgIzbW6gZRoRxkXV2+q5K01sGYy5/bpWE7q/kBZTMEFQiN76DHcjnIML0rFhyx1VliKjYn+/OJPmyR1tt7eaNJqgWWAlvDPmAqFtsNGkC2Yhg6IN7M7fxd+1zYuiODIZwFQnV2kx0NlstZgWIhSR8d9EU2kF6fmICfMnypyFStka4fNZRAX4JpklGxWFqA7n6BtIdPBYzt3DnlOZhgiVGBcP1LuUyk2opqgPI+R98+5fkPXcdu+IdhOaDqmoaUX1/bBhiGZkjIgmmgOHDQDU01dTQqjntNO4KhWepa0xWwfmuX/lT8GhUSqBL+DSo2LfO5rKoqjmstG0dIkoI9iIoTSDL+LIENMkqtSOwXSicBygWyYsNq/Tt79Mfi16gIQWEffk29lfQk/w/4LVQI/A4IKgoDQUVhIKgoDAQVhYGgojAQVBQE5XJHvnQbBE4YVZrt/qUbIYAxKJUql26DwAnlSkk4i4LgqtRITyRwDnRL9Us3QYCg3L50CwQYupdugICAgABAv32dBa9Pl27o34/aKFOy/lXO7RCAWjYP3RNU5A5BRWEgqCgMBBWFgaCiMBBUFAaCisJAUFEYCCoKA0FFYfAQ2SQq10azbrc7fvBf7L2cr0kc9BuoSbNGkc4+lMdISLNR7Tt56o+4G6NeekqcuNtulgiaw5mPpsTTOA/dJ4Rsq1kUNZwjG7/j+2mLNKk1vR5nreARV/BU/kaTBjOcI9NWcv+m6oqp3R1kKr73MmHd2N020hpWfpqW/NjdZelK+al6Sv2cqUUY8uMrqSBD2lo70KRSO4seyg1aQfaN4Ye7ySnHfXrS8t0u0KRJBsb7t8FuVJMVt1cphdFMU5L6rMPS3qZ34oTHK5fw9MRXkSaV7tLyNF5YBc2MVPRvbjOXDo+tSJPe0kznTbQbtw/xyRvR5Ag3ccnL/XH32j+K0qmo1xo3Q3/haRnKb7wmVWI7Mag1nvwVpFNR7o27r34lT6XiiSumZJXt8LI0Y/nzMdGaNr0vMVyMqrtQ0WlUlDuTsD6l5fDE2trtvMzVGC5ewxWkUnFTaQZzpFLhY6I19VWXxIWPiaYvTxwXNTfFU6OGtWuaXEl0yKVR8VCNZEnJ8crSvXbH/f545H7v8NNHxlAqFVH7l0LFI0u3o2JyM8b7MLeS4eyxXx+Prtn3Kt/HMO3wdk5H9FKLS97s+1QMI1mSM7BuPrsCHTxHWulHxNf9dirqVKd3ntd9opeacXmYuam6QWyZkfGa0KadP+btVxIy5D8q+rSPgdklkx1XPfIfFdTUBNx0n1rqmNB8QFsVGMlMkTkWZ8DtYZ+WwgvmGx9tho9sVJSv3RztaQYqXrmyuSdXuYd6O+EKUqmYeb0YZqBiTNJMgmLqUeHxK6NjOxTqU02uRtPTERNeBanFZvCjn40KTn1JSeoxdQ8ThoWHu2xU+NBrpVNR5atmN0E9gNzbhS9TCUSmF/VpjDDvs/S79n0qOulUkLa2It6wRkSWMhW7/zYVtXQqenED5/l0fcoT002MyAdkRhk5EktNV3RxhKpm8gpFLlQMiHZw/BTJO0lebsiFCupZooWO+UYFQW7H2ZUXkiesasQ/81YuiMGuJM7sc6GiEacdrLrHxAryoKI8idMOIAIfRm/0Y0l6IPWFYkHqtGecOh4zWKhcqCA60OboQLkdKxEPeVDRj9cBalaiI5U47QmvHcQCh57vom6Hp/qDCo+7UCfyoIIEb1zLSIb2W2IFeVBBxMpddnkg/Ymu8T3Hq02XRx/p25Rb/2u6mPOgokbml9wpLKkv6tD9yIOK24TROOVrDp1U8BePePS1ExpBIoCYKTpBHlSMkhKQe4n7jzlQQaeofANBgueIt6Wi4TdjFy1PbsWMLgxiIJtJO095UEE1gH8zSSYUOVBBZ9V8SRDVaYY1lgQfLf7yJRFCYBYuE7nwQxJqBZN2z/KgghiDmAdlOwmWgiIHKmjEyg+iaXgTpoK4lw++TZlF1Y0o/s6NkuTHkbfhVyZWMGkNOA8qSLTg2djayLclzOlDGDlQQaQ9cTX8oTF6dMVEh0w40uyENKo+8u2Gk5HU8u9Vk1HkzplGWAxTFtmWiTXgBbpuJ3KgohWotd5B31sdJlgSe7SSKsiBipughs+wjlaYVaeT57DGEi/MvHn5DgcjbaZTjehICtpltqbLxEBCqKTDN3lQQe5TzyzTBcchbXU3LXcuVLwEeslWppnwh6FhTEAIYl6Nrjsxpac1+kcFKZVNFdnmHNtjIlJLWvLJjwrqvtz9Gdqnx4tQce0XRJ/t7+yoJD8CQmeY+gly90mpp+6RMvxGjSytfJAvY5aeRVREGZKOc+RHBVW5CWvShHy/DBUkkqDmYeSKidp+PhVE2DN/ARhkdFOj5g+X7v3C9raEaKUFoMJtEs1QACq8PSeq8s/c3HyNElQk4z9SwY++SRJqX7zjMdmo6LnpqRwKQIWrTnTdqQBURAzUMzd3oBvewY9YKoiwqa9wuWPzjAJQUQy3HaCizsTEViUz+ArXbVPXz6EiGEGxDKzUAkRQdG7jbptchorgdC0czGaIoFy/TVtFp4X+NgapgAae4nmnSy45r2CNIKdVOmwyVIR5BYywmN9clc4yryBF3LJGceYVodk2lOvdvvdl6B9j/E7kRoVXa73R8MRKFj4uPNuGQb9bd1dBMs22T0dVvSZxZtvEU+/4O3UXWoNKWudPXrYlOMMaVAC9qLHBINPCmFVNumwbeF6CyCVxZTZpJzkPKohZjPFQpIN/wsosUZo2/+kUzqpm4n4FHTLn3q94SlL88LItB/ntV/CNR+J+RZM/knhD5jlk0fwgMhkWcBcv8WGR/Hbx+BpAfHrkVBMtlD+SiOkPBl1k6sjf2+6kizmXvW3SB+5gJPsrrcRH2vLY2yZGk3+KPeZUBN3b5gc9PI1KUMHEDV2K/5cTH6Re7jZ/mfQnut1ODA7XrdGdo6DxqscV5PqqS52D4k7yE7rn4sznoLgHaTCIfX/jWag7rkZVYjtHujS52OlAjg5QiSQ/cpXj6UBeite4gRrf2Icdd9x34/pNzw0mP0Cf55lZTkhOAo9pspRzOTNLj7lGQ1MqcI5LoGdmP6J36MpJ+DQXjdOiHolWnvzQd64nySPqQffPUt6anudJ8qgDI23lTpKpxCNW7YFYoujLlalowkds4p5xCHUiFypovyNW8zWLduRDBXvCLFzqOKapGHKMCKmSRyNyKvPQbJE9IZryCoF8qGAyD436WUK3fciHCurAQrMseiY85gwg3WQKlTuOV3L6TEs74Opvs8k4JyrYM7MBl0e9WtqgyIkKJpFAYDdoc4Xt3qYbX4H5AK2MO02lgXFp6Nk7VkXyXApyo4JGewHbzDaRUh90//4DYJmoYHucH95soM8evI2LMtkjkL4FtdGOQ6kL72QI0cLaC7vAmW5036o+0Icnm0PvUiXco341ANoUX45q9BkEdvypVCEvfql32dPAnJOP/Q9/+UNaQcV37SMc3D/xerHztektOrNlo7J0RUKfR/ch7PjgmiVp3pz0vNx4phe8KPABufW+69q98wXTyrDqbYnzVkc5r6wIITxEeqk5eKG024rm23D45r54gPfwFxvy8WiFub5Ly8EbIvfuzWl1WPHe6JC0OOk+T96aDH15Wp4Prt8HXs3lDoMAuEHjmahguwAh7HhmpxZ+Q0QEEWvFeZVLCDxrdc9NmTjzGkTfY4Phi4bqd8G3pEVfUBC3+HQuKmDwEU0XMTQnnI0K7vtWkjY5Ab/eJJpl6p/chamA+msoeTvGY5+NClRVyPC0YizBuQwURF9RVbpNf31bdxLKcxVwdxEqkBe69ZxEsx37Lq/upJKMt7Bd67+l5Khwn3rGrXzxvS/i7SUuJupV0yoYhrM+pfViEvOQdLnR9sbg7jb5WVmKwc3QU5bJfaizHCpQlsbN9cfwo/M0Ks6b+h67V8/D4e1VN1Onz4L+6KmDxHR908j2ujqM2ujltTps38+iKs6lQuASEFQUBoKKwkBQURgIKgqDExWzssDl0UNUDK4EigDx/4MFBDIj8TiqwBnRjzm5LnB2zNLeVylwLlynrb8LnAnl5jf+F4VAnuiVStPsS78COWJ8VY3doRE4M1IOpAqcD4KKwkBQURgIKgoDQUVhIKgoDAQVhYGgojAQVBQGgorC4LdTIf2OzOG/ALb7KfE/H//J+A9U2FQokicmaQGWFL6/ON13VGVxsME2Ng5KN3ei5c3Xko7/ro6gyc4SfVIMdk/WvHSb/8R2cfELVJwkLMtgbMmXuckuImnCXmJqu1HI9S0W+3ID6+3cguNiuQRJm6v+ssgvRZW+8GdFBUteIv5kxXJr02k6VO98/qudLTa+TcVRt5CuGpa2/GltFW1jStbeBEv7woLXbNANbS9rS9iY79pRtTYHkD/RnfkRZ34HZ4FIODhznHqrG+8rWOvWBpZ7w16tpf3G0sDcggWOArqma7DS9kswP7WfoGqbBcz1jW+s/F34NhXvKhjH+QJ9Mpawnyv/2mhUOCYoe3TpS4KvJfq2XtgWbJB2r5dftvyF7mzwMDBN2K4sB346W1QMkj9IuvTDBm1pHmQw5/JPCRV+omKh4MRoVCwXC+kd0I9mKvuljhi1BRUEOrIQ5mINJyp+GhtDQlRsjiD/Cycq9hLMD/B1dLD039F91aVireECbB3+kTArsN0AWFtkelZzWFg2ogKlXKwoFahMVYPDwlzgYaCjQYLKsrWNoILhawvvylFHwY22BQ1TgiQ/N/DPyUC9r8E6wgJp/WENBr5/csbrOazflyqomJDDHJDZgeWXrHzCjyX8UG3YrBEV6PNeRVToiIo5MlU6fMmrg/yPvPwHDitcFujKX2ugsqJDn+1TNxoyEiuknYq1lBaWKYO2AlNbYKc6R59M9BXWSOHRfXlhLeCIZagacECQTesggbzQsOvdagc0slCBW1hbjnzcSisHkXtUwIS1ispEQ2elmXM4as5Kkh3NkUwL1XC8oLwKjGCULx9IoGnvVfe+vDhdM5eRvNhA/UJ9h792ZpEHVtssqdR13u0oJP4H2H5PGzrbVuYAAAAASUVORK5CYII=" alt="Imagen de  un octeto"></img>
      <h2>IPv4</h2>
      <p>
        Una dirección <strong>IPv4</strong> está formada por 4 octetos. Como
        cada octeto tiene 8 bits, una dirección IPv4 tiene un total de{" "}
        <strong>32 bits</strong>.
      </p>

      <p>
        Por ejemplo, en la dirección <code>192.168.1.10</code>, cada parte
        corresponde a un octeto:
      </p>

      <ul>
        <li><code>192</code> es el primer octeto</li>
        <li><code>168</code> es el segundo octeto</li>
        <li><code>1</code> es el tercer octeto</li>
        <li><code>10</code> es el cuarto octeto</li>
      </ul>

      <img className="mx-auto block max-w-full w-3/4" src="https://www.dreamhost.com/blog/wp-content/uploads/2024/07/01-Direccion-IPv4-en-notacion-decimal-con-puntos-1024x716.jpg"  alt="imagen ipv4"></img>

      <h2>IPv6</h2>
      <p>
        Una dirección <strong>IPv6</strong> es más larga que una IPv4. Está
        formada por 128 bits y se escribe en grupos de números hexadecimales
        separados por dos puntos.
      </p>

      <p>
        Un ejemplo de dirección IPv6 sería:
      </p>

      <pre><code>{`2001:0db8:0000:0000:0000:ff00:0042:8329`}</code></pre>

      <p>
        En IPv6 se pueden omitir ciertos ceros para escribir la dirección de
        forma más corta. Por ejemplo, los ceros a la izquierda dentro de cada
        grupo pueden eliminarse.
      </p>

      <pre><code>{`2001:0db8:0000:0000:0000:ff00:0042:8329
2001:db8:0:0:0:ff00:42:8329`}</code></pre>

      <p>
        Además, una secuencia continua de grupos con valor <code>0</code> puede
        reemplazarse por <code>::</code>. Esta abreviación solo debe usarse una
        vez dentro de la misma dirección, para evitar ambigüedad.
      </p>

      <pre><code>{`2001:db8:0:0:0:ff00:42:8329
2001:db8::ff00:42:8329`}</code></pre>

      <div className="callout">
        En el siguiente apunte se explica la máscara de red y la gateway. Esos
        conceptos ayudan a entender cómo una máquina reconoce su red local y
        por dónde debe salir para comunicarse con otras redes.
      </div>

      {/* ── FIN DEL CONTENIDO ─────────────────────────────── */}

    </NoteLayout>
  );
}
